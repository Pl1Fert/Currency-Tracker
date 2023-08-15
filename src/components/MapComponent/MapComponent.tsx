import mapboxgl, { Map, Marker } from "mapbox-gl";
import { Component, createRef } from "react";

import { ENV_VARS } from "@/constants";
import { CurrencyService, MapService } from "@/services";

import { IProps, IState } from "./mapComponent.interfaces";
import styles from "./mapComponent.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
export class MapComponent extends Component<IProps, IState> {
    private mapContainer = createRef<HTMLDivElement>();

    private map: Map | undefined;

    private markers: Marker[] = [];

    override componentDidMount(): void {
        const success = (position: GeolocationPosition): void => {
            this.map = new mapboxgl.Map({
                container: this.mapContainer.current as HTMLElement,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 10,
                accessToken: ENV_VARS.MAPBOX_API_KEY,
            });

            MapService.getBanks({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
                .then((features) => {
                    if (features.length > 0) {
                        this.setState((prevState) => ({
                            ...prevState,
                            features,
                        }));
                    }

                    throw new Error("Error");
                })
                .catch(() => {});
        };

        const getLocation = (): void => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success);
            }
        };

        getLocation();
    }

    override shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
        const symbols = CurrencyService.getCurrencySymbols();

        return symbols.includes(nextProps.inputValue) || nextProps.inputValue === "";
    }

    override componentDidUpdate(): void {
        const { features } = this.state;
        const { inputValue } = this.props;

        this.markers.map((marker) => marker.remove());
        this.markers = [];

        features
            .filter((feature) =>
                inputValue === "" ? true : feature.currencies.includes(inputValue)
            )
            .map((feature) => {
                const marker = new mapboxgl.Marker()
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }).setHTML(
                            `<p>${feature.properties.name}</p>`
                        )
                    )
                    .addTo(this.map as Map);
                this.markers.push(marker);

                return marker;
            });
    }

    override componentWillUnmount(): void {
        this.map?.remove();
    }

    override render() {
        return <div ref={this.mapContainer} className={styles.mapContainer} />;
    }
}
