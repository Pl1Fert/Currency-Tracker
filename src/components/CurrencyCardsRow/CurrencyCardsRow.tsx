import { FC, useState } from "react";

import { CurrencyCard } from "@/components";
import { useAppSelector } from "@/hooks";

import styles from "./CurrencyCardsRow.module.scss";

interface ICard {
    id: number;
    title: string;
    icon: string;
    symbol: string;
}

interface CurrencyCardsRowProps {
    title: string;
    cards: ICard[];
    rates?: Map<string, number>;
}

export const CurrencyCardsRow: FC<CurrencyCardsRowProps> = ({ title, cards, rates }) => {
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);
    const [isModalOpen, setIsModalOpen] = useState<number>(0);

    const closeModal = () => {
        setIsModalOpen(() => 0);
    };

    const openModal = (id: number) => {
        setIsModalOpen(() => id);
    };

    const modal = {
        isModalOpen,
        closeModal,
        openModal,
    };

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
                    <CurrencyCard
                        key={card.id}
                        card={card}
                        text={`R$ ${rates?.get(card.symbol)?.toFixed(2)}`}
                        modal={modal}
                    />
                ))}
            </div>
        </section>
    );
};
