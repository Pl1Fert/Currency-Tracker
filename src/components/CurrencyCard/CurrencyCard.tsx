import { FC } from "react";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { modalActions } from "@/store/modalSlice";
import { modalSelector, themeSelector } from "@/store/selectors";

import { CurrencyCardProps } from "./currencyCard.interfaces";

import styles from "./currencyCard.module.scss";

export const CurrencyCard: FC<CurrencyCardProps> = ({ text = "No Info", card }) => {
    const darkTheme = useAppSelector(themeSelector);
    const cardIdToOpenModal = useAppSelector(modalSelector);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(modalActions.openModal(card.id));
    };

    return (
        <>
            {cardIdToOpenModal === card.id && <Modal card={card} />}
            <div
                className={
                    darkTheme
                        ? `${styles.currencyCard} ${styles.currencyCardDarkTheme}`
                        : `${styles.currencyCard}`
                }
                onClick={handleClick}
                onKeyDown={handleClick}
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
