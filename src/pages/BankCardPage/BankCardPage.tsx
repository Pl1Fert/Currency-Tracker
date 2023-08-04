import { Component } from "react";

import { MapComponent, Search } from "@/components";

import styles from "./BankCardPage.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
export default class BankCardPage extends Component {
    override render() {
        return (
            <div className={styles.mapContainer}>
                <Search />
                <MapComponent />
            </div>
        );
    }
}
