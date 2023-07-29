import { FC } from "react";

import { StockCardProps } from "./StockCard.interfaces";
import styles from "./StockCard.module.scss";

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
