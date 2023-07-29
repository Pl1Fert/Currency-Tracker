import { FC } from "react";

import { Modal } from "@/components";

import styles from "./CurrencyCard.module.scss";

interface CurrencyCardProps {
    card: ICard;
    text?: string;
    modal: {
        cardIdToOpenModal: number;
        closeModal: () => void;
        openModal: (id: number) => void;
    };
}

interface ICard {
    id: number;
    title: string;
    icon: string;
    symbol: string;
}

export const CurrencyCard: FC<CurrencyCardProps> = ({ text = "No Info", card, modal }) => (
    <>
        {modal.cardIdToOpenModal === card.id && <Modal closeModal={modal.closeModal} card={card} />}
        <div
            className={styles.currencyCard}
            onClick={() => modal.openModal(card.id)}
            onKeyDown={() => modal.openModal(card.id)}
            tabIndex={0}
            role="button">
            <div>
                <img src={card.icon} alt="title" />
            </div>
            <div>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardText}>{text}</p>
            </div>
        </div>
    </>
);
