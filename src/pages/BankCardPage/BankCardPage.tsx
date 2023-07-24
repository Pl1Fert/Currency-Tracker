import { FC } from "react";

import styles from "./BankCardPage.module.scss";

interface BankCardPageProps {}

export const BankCardPage: FC<BankCardPageProps> = () => (
    <div className={styles.BankCardPage}>BankCardPage Component</div>
);
