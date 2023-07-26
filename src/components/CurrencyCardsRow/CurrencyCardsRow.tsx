import { FC } from "react";

import { CurrencyCard } from "@/components";
import { useAppSelector } from "@/hooks";

import styles from "./CurrencyCardsRow.module.scss";

interface ICard {
    id: number;
    title: string;
    icon: string;
}

interface CurrencyCardsRowProps {
    title: string;
    cards: ICard[];
}

export const CurrencyCardsRow: FC<CurrencyCardsRowProps> = ({ title, cards }) => {
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
            <div className={styles.currencyCardsRow}>
                {cards.map((card) => (
                    <CurrencyCard key={card.id} title={card.title} icon={card.icon} />
                ))}
            </div>
        </section>
    );
};
