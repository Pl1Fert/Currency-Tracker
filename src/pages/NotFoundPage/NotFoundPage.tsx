import { FC } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { AppRoutes } from "@/constants";

import styles from "./notFoundPage.module.scss";

const NotFoundPage: FC = () => (
    <section>
        <div className={styles.container}>
            <div className={styles.sectionInner}>
                <img src={logo} alt="logo" />
                <div>
                    <h1 className={styles.title}>404</h1>
                    <h2 className={styles.subtitle}>UH OH! You&apos;re lost.</h2>
                    <p className={styles.text}>
                        The page you are looking for does not exist. How you got here is a mystery.
                        But you can click the button below to go back to the homepage.
                    </p>
                    <Link to={AppRoutes.HOME} className={styles.button}>
                        Home
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

export default NotFoundPage;
