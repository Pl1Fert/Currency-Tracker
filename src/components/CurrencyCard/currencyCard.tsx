import { memo } from "react";

import { Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { modalActions } from "@/store/modalSlice";
import { modalSelector, themeSelector } from "@/store/selectors";
import { combineClassNames } from "@/utils";

import { CurrencyCardProps } from "./currencyCard.interfaces";

import styles from "./currencyCard.module.scss";

export const CurrencyCard = memo<CurrencyCardProps>(
    ({ text = "No Info", card: { id, icon, title }, card }) => {
        const darkTheme = useAppSelector(themeSelector);
        const cardIdToOpenModal = useAppSelector(modalSelector);
        const dispatch = useAppDispatch();

        const handleClick = (): void => {
            dispatch(modalActions.openModal(id));
        };

        return (
            <>
                {cardIdToOpenModal === id && <Modal card={card} />}
                <div
                    className={combineClassNames(
                        styles.currencyCard!,
                        styles.currencyCardDarkTheme!,
                        darkTheme
                    )}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                    tabIndex={0}
                    role="button">
                    <div>
                        <img src={icon} alt="title" className={styles.icon} />
                    </div>
                    <div>
                        <p
                            className={combineClassNames(
                                styles.cardTitle!,
                                styles.cardTitleDarkTheme!,
                                darkTheme
                            )}>
                            {title}
                        </p>
                        <p
                            className={combineClassNames(
                                styles.cardText!,
                                styles.cardTextDarkTheme!,
                                darkTheme
                            )}>
                            {text}
                        </p>
                    </div>
                </div>
            </>
        );
    }
);
