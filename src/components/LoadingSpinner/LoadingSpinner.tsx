import { FC } from "react";

import styles from "./LoadingSpinner.module.scss";

export const LoadingSpinner: FC = () => (
    <div className={styles.ring}>
        <h1>Loading</h1>
        <span className={styles.span} />
    </div>
);
