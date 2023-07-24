import { FC } from "react";

import styles from "./HomePage.module.scss";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => (
    <div className={styles.HomePage}>HomePage Component</div>
);
