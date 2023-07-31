import React, { SyntheticEvent } from "react";

import { Chart } from "@/components";
import { ICurrencyCard } from "@/components/components.interfaces";
import { QUOTES_CARDS_ROW } from "@/constants";
import { CurrencyService } from "@/services";

import { IProps, IState } from "./TimelinePage.interfaces";
import styles from "./TimelinePage.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
class TimelinePage extends React.Component<IProps, IState> {
    cards = QUOTES_CARDS_ROW.cards;

    constructor(props = {}) {
        super(props);
        this.state = {
            selectedCard: this.cards.at(0),
        };
    }

    getSelectedCard = (symbol: string): ICurrencyCard | undefined =>
        this.cards.find((card) => card.symbol === symbol);

    handleOptionChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const card = this.getSelectedCard(target.value);
        this.setState({ selectedCard: card });
    };

    override render() {
        const { selectedCard } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.top}>
                    <select
                        defaultValue="USD"
                        onChange={this.handleOptionChange}
                        className={styles.select}>
                        {CurrencyService.getCurrencySymbols().map((symbol) => (
                            <option key={symbol} value={symbol}>
                                {symbol}
                            </option>
                        ))}
                    </select>
                </div>
                <Chart card={selectedCard} />
            </div>
        );
    }
}

export default TimelinePage;
