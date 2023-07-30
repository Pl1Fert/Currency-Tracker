import { FC } from "react";

import { StockCard } from "@/components";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";

import { StocksCardsRowProps } from "./StocksCardsRow.interfaces";
import styles from "./StocksCardsRow.module.scss";

export const StocksCardsRow: FC<StocksCardsRowProps> = ({ title, cards }) => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <section>
            <p
                className={
                    darkTheme ? `${styles.title} ${styles.titleDarkTheme}` : `${styles.title}`
                }>
                {title}
            </p>
            <hr className={styles.border} />
            <div className={styles.cardsRow}>
                {cards.map((card) => (
                    <StockCard key={card.id} card={card} text="0.15%" />
                ))}
            </div>
        </section>
    );
};
