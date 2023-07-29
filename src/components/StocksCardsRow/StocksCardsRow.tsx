import { FC } from "react";

import { StockCard } from "@/components";
import { useAppSelector } from "@/hooks";

import styles from "./StocksCardsRow.module.scss";

interface StocksCardsRowProps {}

interface ICard {
    id: number;
    title: string;
    icon: string;
}

interface StocksCardsRowProps {
    title: string;
    cards: ICard[];
}

export const StocksCardsRow: FC<StocksCardsRowProps> = ({ title, cards }) => {
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);

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
