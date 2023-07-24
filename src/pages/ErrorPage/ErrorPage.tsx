import { FC } from "react";

import styles from "./ErrorPage.module.scss";

interface ErrorPageProps {}

export const ErrorPage: FC<ErrorPageProps> = () => (
    <div className={styles.ErrorPage}>ErrorPage Component</div>
);
