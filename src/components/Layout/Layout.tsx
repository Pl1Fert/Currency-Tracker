import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "@/components";
import { useAppSelector } from "@/hooks";

import styles from "./Layout.module.scss";

export const Layout: FC = () => {
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);

    const containerStyles = darkTheme
        ? `${styles.container} ${styles.containerDarkTheme}`
        : `${styles.container}`;

    return (
        <div className={containerStyles}>
            <div className={styles.wrapper}>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};
