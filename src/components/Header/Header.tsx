import { FC } from "react";

import logo from "@/assets/logo.svg";
import { NavBar } from "@/components";
import { useAppSelector } from "@/hooks";

import styles from "./Header.module.scss";

export const Header: FC = () => {
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);

    return (
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
            <div className={styles.updated_row}>
                <span className={styles.updated_pulse_button} />
                <p
                    className={
                        darkTheme
                            ? `${styles.updated_text} ${styles.updated_text_dark_theme}`
                            : `${styles.updated_text}`
                    }>
                    Last updated at 11:59pm
                </p>
            </div>
        </header>
    );
};
