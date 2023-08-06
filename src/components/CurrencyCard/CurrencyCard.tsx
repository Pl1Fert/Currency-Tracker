import { FC } from "react";

import { Modal } from "@/components";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";

import { CurrencyCardProps } from "./CurrencyCard.interfaces";
import styles from "./CurrencyCard.module.scss";

export const CurrencyCard: FC<CurrencyCardProps> = ({ text = "No Info", card, modal }) => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <>
            {modal.cardIdToOpenModal === card.id && (
                <Modal closeModal={modal.closeModal} card={card} />
            )}
            <div
                className={
                    darkTheme
                        ? `${styles.currencyCard} ${styles.currencyCardDarkTheme}`
                        : `${styles.currencyCard}`
                }
                onClick={() => modal.openModal(card.id)}
                onKeyDown={() => modal.openModal(card.id)}
                tabIndex={0}
                role="button">
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
        </>
    );
};
