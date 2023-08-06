import { Component, SyntheticEvent } from "react";
import { connect, ConnectedProps } from "react-redux";

import { CurrencyService } from "@/services";
import { RootState } from "@/store";

import { IProps, IState } from "./Search.interfaces";
import styles from "./Search.module.scss";

class Search extends Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isListOpen: true,
        };
    }

    handleItemClick = (e: SyntheticEvent): void => {
        const target = e.target as HTMLElement;
        const { setInputValue } = this.props;
        this.setState((prevState) => ({
            ...prevState,
            isListOpen: false,
        }));
        setInputValue(target.textContent ?? "");
    };

    handleChange = (e: SyntheticEvent): void => {
        const { setInputValue } = this.props;
        const target = e.target as HTMLInputElement;

        setInputValue(target.value);
    };

    handleInputClick = (): void => {
        this.setState((prevState) => ({ ...prevState, isListOpen: true }));
    };

    override render() {
        const { isListOpen } = this.state;
        const { inputValue, darkTheme } = this.props;
        const symbols: string[] = CurrencyService.getCurrencySymbols();
        const filteredSymbols = symbols
            .filter((symbol) => symbol.toLowerCase().includes(inputValue.toLowerCase()))
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        return (
            <div>
                <h1
                    className={
                        darkTheme ? `${styles.title} ${styles.titleDarkTheme}` : `${styles.title}`
                    }>
                    Search currency in the bank
                </h1>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Сurrency search..."
                        value={inputValue}
                        onChange={this.handleChange}
                        className={
                            darkTheme
                                ? `${styles.input} ${styles.inputDarkTheme}`
                                : `${styles.input}`
                        }
                        onClick={this.handleInputClick}
                    />
                    <ul
                        className={
                            darkTheme
                                ? `${styles.currencyList} ${styles.currencyListDarkTheme}`
                                : `${styles.currencyList}`
                        }>
                        {inputValue.length !== 0 &&
                            isListOpen &&
                            filteredSymbols.map((symbol) => (
                                <li
                                    key={symbol}
                                    className={
                                        darkTheme
                                            ? `${styles.currencyListItem} ${styles.currencyListItemDarkTheme}`
                                            : `${styles.currencyListItem}`
                                    }>
                                    <button
                                        type="button"
                                        onClick={this.handleItemClick}
                                        className={
                                            darkTheme
                                                ? `${styles.currencyListItemButton} ${styles.currencyListItemButtonDarkTheme}`
                                                : `${styles.currencyListItemButton}`
                                        }>
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

const mapStateToProps = (state: RootState, ownProps: IProps) => ({
    darkTheme: state.theme.darkTheme,
    ...ownProps,
});

const connected = connect(mapStateToProps);

type Props = ConnectedProps<typeof connected>;

const connector = connected(Search);

export { connector as Search };
