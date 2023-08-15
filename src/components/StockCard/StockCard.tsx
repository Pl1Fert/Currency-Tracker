import { FC } from "react";

import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";

import { StockCardProps } from "./stockCard.interfaces";
import styles from "./stockCard.module.scss";

export const StockCard: FC<StockCardProps> = ({ text = "No Info", card }) => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <div
            className={
                darkTheme
                    ? `${styles.stockCard} ${styles.stockCardDarkTheme}`
                    : `${styles.stockCard}`
            }>
            <div>
                <img src={card.icon} alt="title" className={styles.icon} />
            </div>
            <div>
                <p
                    className={
                        darkTheme
                            ? `${styles.cardTitle} ${styles.cardTitleDarkTheme}`
                            : `${styles.cardTitle}`
                    }>
                    {card.title}
                </p>
                <p
                    className={
                        darkTheme
                            ? `${styles.cardText} ${styles.cardTextDarkTheme}`
                            : `${styles.cardText}`
                    }>
                    {text}
                </p>
            </div>
        </div>
    );
};
