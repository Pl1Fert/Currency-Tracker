import { FC } from "react";

import { CurrencyCard } from "@/components";

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

export const CurrencyCardsRow: FC<CurrencyCardsRowProps> = ({ title, cards }) => (
    <section>
        <p className={styles.title}>{title}</p>
        <hr className={styles.border} />
        <div className={styles.currencyCardsRow}>
            {cards.map((card) => (
                <CurrencyCard key={card.id} title={card.title} text="aboba" icon={card.icon} />
            ))}
        </div>
    </section>
);
