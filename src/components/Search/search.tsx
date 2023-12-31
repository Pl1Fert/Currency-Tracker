import { PureComponent, SyntheticEvent } from "react";
import { connect, ConnectedProps } from "react-redux";

import { CurrencyService } from "@/services";
import { RootState } from "@/store";
import { combineClassNames, getFilteredSymbols } from "@/utils";

import { IProps, IState } from "./search.interfaces";

import styles from "./search.module.scss";

class Search extends PureComponent<Props, IState> {
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
        const filteredSymbols = getFilteredSymbols(symbols, inputValue);

        return (
            <div>
                <h1 className={combineClassNames(styles.title!, styles.titleDarkTheme!, darkTheme)}>
                    Search currency in the bank
                </h1>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Сurrency search..."
                        value={inputValue}
                        onChange={this.handleChange}
                        className={combineClassNames(
                            styles.input!,
                            styles.inputDarkTheme!,
                            darkTheme
                        )}
                        onClick={this.handleInputClick}
                    />
                    <ul
                        className={combineClassNames(
                            styles.currencyList!,
                            styles.currencyListDarkTheme!,
                            darkTheme
                        )}>
                        {inputValue.length !== 0 &&
                            isListOpen &&
                            filteredSymbols.map((symbol) => (
                                <li
                                    key={symbol}
                                    className={combineClassNames(
                                        styles.currencyListItem!,
                                        styles.currencyListItemDarkTheme!,
                                        darkTheme
                                    )}>
                                    <button
                                        type="button"
                                        onClick={this.handleItemClick}
                                        className={combineClassNames(
                                            styles.currencyListItemButton!,
                                            styles.currencyListItemButtonDarkTheme!,
                                            darkTheme
                                        )}>
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
