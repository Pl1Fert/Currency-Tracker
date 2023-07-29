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
                <div className={styles.topContent}>
                    <h1 className={styles.topTitle}>Modsen Currency Tracker</h1>
                    <p className={styles.topText}>
                        Quotes for the dollar and other international currencies.
                    </p>
                </div>
                <div className={styles.topImageBlock}>
                    <img src={logo} alt="logo" className={styles.topImage} />
                </div>
            </div>
            <div className={styles.updatedRow}>
                <span className={styles.updatedPulseButton} />
                <p
                    className={
                        darkTheme
                            ? `${styles.updatedText} ${styles.updatedTextDarkTheme}`
                            : `${styles.updatedText}`
                    }>
                    Last updated at 11:59pm
                </p>
            </div>
        </header>
    );
};
