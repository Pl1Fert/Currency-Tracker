import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "@/components";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";
import { combineClassNames } from "@/utils";

import styles from "./layout.module.scss";

export const Layout: FC = () => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <div
            className={combineClassNames(styles.container!, styles.containerDarkTheme!, darkTheme)}>
            <div className={styles.wrapper}>
                <Header />
                <main>
                    <Suspense
                        fallback={
                            <h1
                                className={combineClassNames(
                                    styles.loading!,
                                    styles.loadingDarkTheme!,
                                    darkTheme
                                )}>
                                Loading...
                            </h1>
                        }>
                        <Outlet />
                    </Suspense>
                </main>
                <Footer />
            </div>
        </div>
    );
};
