import { FC } from "react";

import styles from "./NotFoundPage.module.scss";

interface NotFoundPageProps {}

export const NotFoundPage: FC<NotFoundPageProps> = () => (
    <div className={styles.NotFoundPage}>NotFoundPage Component</div>
);
