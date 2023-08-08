import { FC, SyntheticEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { CurrencyService } from "@/services";

import { IState, ModalProps } from "./Modal.interfaces";
import styles from "./Modal.module.scss";

export const Modal: FC<ModalProps> = ({ closeModal, card }) => {
    const initialState: IState = {
        currencyAmount: 1,
        amountInFromCurrency: true,
        toCurrencyOption: "BRL",
        exchangeRate: 1,
    };
    const [currencyState, setCurrencyState] = useState<IState>(initialState);
    const currencySymbols: string[] = [
        ...CurrencyService.getCurrencySymbols().filter((symbol) => symbol !== card.symbol),
        "BRL",
    ];

    let toCurrencyAmount: number = 1;
    let fromCurrencyAmount: number = 1;

    if (currencyState.amountInFromCurrency) {
        fromCurrencyAmount = currencyState.currencyAmount;
        toCurrencyAmount = currencyState.currencyAmount * currencyState.exchangeRate;
    } else {
        toCurrencyAmount = currencyState.currencyAmount;
        fromCurrencyAmount = currencyState.currencyAmount / currencyState.exchangeRate;
    }

    useEffect(() => {
        CurrencyService.getCurrencyExchangeRate(card.symbol, currencyState.toCurrencyOption)
            .then((newExchangeRate) => {
                if (newExchangeRate === -1) {
                    throw new Error("error");
                }

                setCurrencyState(
                    (prevState): IState => ({
                        ...prevState,
                        exchangeRate: newExchangeRate,
                    })
                );
            })
            .catch(() => {
                throw new Error("error");
            });
    }, [currencyState.toCurrencyOption]);

    const handleFromCurrencyAmountChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setCurrencyState(
            (prevState): IState => ({
                ...prevState,
                currencyAmount: Number(target.value),
                amountInFromCurrency: true,
            })
        );
    };

    const handleToCurrencyAmountChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setCurrencyState(
            (prevState): IState => ({
                ...prevState,
                currencyAmount: Number(target.value),
                amountInFromCurrency: false,
            })
        );
    };

    const handleToCurrecyOptionChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setCurrencyState(
            (prevState): IState => ({
                ...prevState,
                toCurrencyOption: target.value,
            })
        );
    };

    return createPortal(
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                <div>
                    <div className={styles.row}>
                        <input
                            type="number"
                            value={fromCurrencyAmount}
                            className={styles.input}
                            onChange={handleFromCurrencyAmountChange}
                        />
                        <p className={styles.symbol}>{card.symbol}</p>
                    </div>
                    <div className={styles.row}>
                        <input
                            type="number"
                            value={toCurrencyAmount}
                            className={styles.input}
                            onChange={handleToCurrencyAmountChange}
                        />
                        <select
                            name="currencyOption"
                            id="CurrencyOption"
                            className={styles.select}
                            defaultValue={currencyState.toCurrencyOption}
                            onChange={handleToCurrecyOptionChange}>
                            {currencySymbols.map((symbol) => (
                                <option key={symbol} value={symbol}>
                                    {symbol}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="button" onClick={closeModal} className={styles.closeButton}>
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
};
