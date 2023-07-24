import { FC } from "react";

import logo from "@/assets/logo.svg";
import { NavBar } from "@/components";

import styles from "./Header.module.scss";

export const Header: FC = () => (
    <header>
        <NavBar />
        <div className={styles.top}>
            <div className={styles.top_content}>
                <h1 className={styles.top_title}>Modsen Currency Tracker</h1>
                <p className={styles.top_text}>
                    Quotes for the dollar and other international currencies.
                </p>
            </div>
            <div className={styles.top_image_block}>
                <img src={logo} alt="logo" className={styles.top_image} />
            </div>
        </div>
    </header>
);
