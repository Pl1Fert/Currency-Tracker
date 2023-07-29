import { FC } from "react";

import logo from "@/assets/logo.svg";

import styles from "./ErrorPage.module.scss";

const ErrorPage: FC = () => (
    <section>
        <div className={styles.container}>
            <div className={styles.sectionInner}>
                <img src={logo} alt="logo" />
                <div>
                    <h1 className={styles.title}>Something went wrong...</h1>
                </div>
            </div>
        </div>
    </section>
);

export default ErrorPage;
