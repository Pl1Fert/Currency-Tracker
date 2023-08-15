import { FC, useState } from "react";

import { CurrencyCard } from "@/components";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";

import { CurrencyCardsRowProps } from "./currencyCardsRow.interfaces";

import styles from "./currencyCardsRow.module.scss";

export const CurrencyCardsRow: FC<CurrencyCardsRowProps> = ({ title, cards, rates }) => {
    const darkTheme = useAppSelector(themeSelector);
    const [cardIdToOpenModal, setCardIdToOpenModal] = useState<number>(0);

    const closeModal = () => {
        setCardIdToOpenModal(() => 0);
    };

    const openModal = (id: number) => {
        setCardIdToOpenModal(() => id);
    };

    const modal = {
        cardIdToOpenModal,
        closeModal,
        openModal,
    };

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
                    <CurrencyCard
                        key={card.id}
                        card={card}
                        text={
                            rates?.get(card.symbol)
                                ? `R$ ${rates?.get(card.symbol)?.toFixed(2)}`
                                : undefined
                        }
                        modal={modal}
                    />
                ))}
            </div>
        </section>
    );
};
