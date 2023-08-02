import mapboxgl, { Map } from "mapbox-gl";
import { Component, createRef } from "react";

import { BANKS, ENV_VARS } from "@/constants";

import styles from "./Map.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
export class MapComponent extends Component {
    mapContainer = createRef<HTMLDivElement>();

    private map: Map | undefined;

    override componentDidMount(): void {
        this.map = new mapboxgl.Map({
            container: this.mapContainer.current as HTMLElement,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [27.5667, 53.9],
            zoom: 10,
            accessToken: ENV_VARS.MAPBOX_API_KEY,
        });

        BANKS.banks.map((bank) =>
            new mapboxgl.Marker()
                .setLngLat(bank.geometry.coordinates as [number, number])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setHTML(`<p>${bank.properties.title}</p>`)
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
