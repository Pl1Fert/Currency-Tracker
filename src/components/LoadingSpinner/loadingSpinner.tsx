import { FC } from "react";

import styles from "./loadingSpinner.module.scss";

export const LoadingSpinner: FC = () => (
    <div className={styles.ring}>
        <h3>Loading</h3>
        <span className={styles.span} />
    </div>
);
