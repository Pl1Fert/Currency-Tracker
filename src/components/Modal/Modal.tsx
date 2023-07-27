import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

interface ICard {
    id: number;
    title: string;
    icon: string;
    symbol: string;
}

interface ModalProps {
    closeModal: () => void;
    card: ICard;
}

export const Modal: FC<ModalProps> = ({ closeModal, card }) => {
    const [fromCurrency, setFromCurrency] = useState<number>(1);
    const [toCurrency, setToCurrency] = useState<number>(1);

    useEffect(() => {}, [fromCurrency, toCurrency]);

    return createPortal(
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                <div>
                    <div>
                        <input
                            type="number"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(parseInt(e.target.value, 10))}
                        />
                        <p>{card.symbol}</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(parseInt(e.target.value, 10))}
                        />
                    </div>
                </div>
                <button type="button" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
};
