import { FC } from "react";

import styles from "./StockCard.module.scss";

interface ICard {
    id: number;
    title: string;
    icon: string;
}

interface StockCardProps {
    card: ICard;
    text?: string;
}

export const StockCard: FC<StockCardProps> = ({ text = "No Info", card }) => (
    <div className={styles.stockCard}>
        <div>
            <img src={card.icon} alt="title" />
        </div>
        <div>
            <p className={styles.cardTitle}>{card.title}</p>
            <p className={styles.cardText}>{text}</p>
        </div>
    </div>
);
