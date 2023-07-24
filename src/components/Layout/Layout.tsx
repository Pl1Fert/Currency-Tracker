import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "@/components";

import styles from "./Layout.module.scss";

export const Layout: FC = () => (
    <div className={styles.container}>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
);
