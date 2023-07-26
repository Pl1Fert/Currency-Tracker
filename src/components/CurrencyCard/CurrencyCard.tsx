import { FC } from "react";

import styles from "./CurrencyCard.module.scss";

interface CurrencyCardProps {
    title: string;
    text?: string;
    icon: string;
}

export const CurrencyCard: FC<CurrencyCardProps> = ({ title, text = "0.15%", icon }) => (
    <div className={styles.currencyCard}>
        <div>
            <img src={icon} alt="title" />
        </div>
        <div>
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardText}>{text}</p>
        </div>
    </div>
);
