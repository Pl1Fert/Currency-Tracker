import { FC } from "react";

import { CurrencyCard } from "@/components";
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
                    darkTheme ? `${styles.title} ${styles.title_dark_theme}` : `${styles.title}`
                }>
                {title}
            </p>
            <hr className={styles.border} />
            <div className={styles.cardsRow}>
                {cards.map((card) => (
                    <CurrencyCard key={card.id} title={card.title} icon={card.icon} text="0.15%" />
                ))}
            </div>
        </section>
    );
};
