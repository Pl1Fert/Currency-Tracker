import mapboxgl, { Map } from "mapbox-gl";
import { Component, createRef } from "react";

import { ENV_VARS } from "@/constants";
import { MapService } from "@/services";

import { IProps, IState } from "./MapComponent.interfaces";
import styles from "./MapComponent.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
export class MapComponent extends Component<IProps, IState> {
    mapContainer = createRef<HTMLDivElement>();

    private map: Map | undefined;

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
                    if (features) {
                        this.setState((prevState) => ({
                            ...prevState,
                            features,
                        }));
                    }
                })
                .catch(() => {
                    throw new Error("error");
                });
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success);
            }
        };

        getLocation();
    }

    override componentDidUpdate(): void {
        const { features } = this.state;

        features.map((feature) =>
            new mapboxgl.Marker()
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setHTML(`<p>${feature.properties.name}</p>`)
                )
                .addTo(this.map as Map)
        );
    }

    override componentWillUnmount(): void {
        this.map?.remove();
    }

    override render() {
        return <div ref={this.mapContainer} className={styles.mapContainer} />;
    }
}
