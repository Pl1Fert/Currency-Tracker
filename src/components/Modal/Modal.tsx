import { FC, SyntheticEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useAppDispatch } from "@/hooks";
import { CurrencyService } from "@/services";
import { modalActions } from "@/store/modalSlice";

import { IState, ModalProps } from "./modal.interfaces";

import styles from "./modal.module.scss";

export const Modal: FC<ModalProps> = ({ card }) => {
    const initialState: IState = {
        currencyAmount: 1,
        amountInFromCurrency: true,
        toCurrencyOption: "BRL",
        exchangeRate: 1,
    };

    const dispatch = useAppDispatch();

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
            .catch(() => {});
    }, [currencyState.toCurrencyOption]);

    const handleCurrencyAmountChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setCurrencyState(
            (prevState): IState => ({
                ...prevState,
                currencyAmount: Number(target.value),
                amountInFromCurrency: target.name !== "toCurrencyInput",
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

    const handleClose = () => {
        dispatch(modalActions.closeModal());
    };

    return createPortal(
        <div
            className={styles.modalWrapper}
            onClick={handleClose}
            onKeyDown={handleClose}
            tabIndex={0}
            role="button">
            <div className={styles.modal}>
                <div>
                    <div className={styles.row}>
                        <input
                            type="number"
                            name="fromCurrencyInput"
                            value={fromCurrencyAmount}
                            className={styles.input}
                            onChange={handleCurrencyAmountChange}
                        />
                        <p className={styles.symbol}>{card.symbol}</p>
                    </div>
                    <div className={styles.row}>
                        <input
                            type="number"
                            name="toCurrencyInput"
                            value={toCurrencyAmount}
                            className={styles.input}
                            onChange={handleCurrencyAmountChange}
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
                <button type="button" onClick={handleClose} className={styles.closeButton}>
                    Close
                </button>
            </div>
        </div>,
        document.body
    );
};
