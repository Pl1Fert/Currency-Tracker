import { Component, SyntheticEvent } from "react";

import { CurrencyService } from "@/services";

import { IProps, IState } from "./Search.interfaces";
import styles from "./Search.module.scss";

export class Search extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            inputValue: "",
            isListOpen: true,
        };
    }

    handleChange = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        this.setState((prevState) => ({ ...prevState, inputValue: target.value }));
    };

    handleItemClick = (e: SyntheticEvent) => {
        const target = e.target as HTMLElement;
        this.setState((prevState) => ({
            ...prevState,
            inputValue: target.textContent ?? "",
            isListOpen: false,
        }));
    };

    handleInputClick = () => {
        this.setState((prevState) => ({ ...prevState, isListOpen: true }));
    };

    override render() {
        const { inputValue, isListOpen } = this.state;
        const symbols: string[] = CurrencyService.getCurrencySymbols();
        const filteredSymbols = symbols
            .filter((symbol) => symbol.toLowerCase().includes(inputValue.toLowerCase()))
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        return (
            <div>
                <h1 className={styles.title}>Search currency in the bank</h1>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Сurrency search..."
                        value={inputValue}
                        onChange={this.handleChange}
                        className={styles.input}
                        onClick={this.handleInputClick}
                    />
                    <ul className={styles.currencyList}>
                        {inputValue.length !== 0 &&
                            isListOpen &&
                            filteredSymbols.map((symbol) => (
                                <li key={symbol} className={styles.currencyListItem}>
                                    <button
                                        type="button"
                                        onClick={this.handleItemClick}
                                        className={styles.currencyListItemButton}>
                                        {symbol}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}
