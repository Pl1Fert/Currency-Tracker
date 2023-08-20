import { PureComponent, SyntheticEvent } from "react";
import { connect, ConnectedProps } from "react-redux";

import { Chart, DateSelector, Notification, NotificationDisplay } from "@/components";
import { QUOTES_CARDS_ROW } from "@/constants";
import { ICurrencyCard } from "@/interfaces/cardsTypes";
import { CurrencyService, DateService } from "@/services";
import { RootState } from "@/store";
import { calculateDateDiff, combineClassNames } from "@/utils";

import { IProps, IState } from "./timeLinePage.interfaces";

import styles from "./timeLinePage.module.scss";

class TimelinePage extends PureComponent<Props, IState> {
    private cards = QUOTES_CARDS_ROW.cards;

    private notification = new Notification();

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedCard: this.cards.at(0),
            startDate: DateService.getPreviousDates().at(-1) as string,
            endDate: DateService.getPreviousDates().at(0) as string,
        };
    }

    getSelectedCard = (symbol: string): ICurrencyCard | undefined =>
        this.cards.find((card) => card.symbol === symbol);

    handleOptionChange = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        const card = this.getSelectedCard(target.value);
        this.setState((prevState) => ({ ...prevState, selectedCard: card }));
    };

    handleStartDateChange = (startDate: string): void => {
        const { endDate } = this.state;
        this.notification.setDiff(calculateDateDiff(startDate, endDate));
        this.setState((prevState) => ({ ...prevState, startDate }));
    };

    handleEndDateChange = (endDate: string): void => {
        const { startDate } = this.state;
        this.notification.setDiff(calculateDateDiff(startDate, endDate));
        this.setState((prevState) => ({ ...prevState, endDate }));
    };

    override render() {
        const { selectedCard, startDate, endDate } = this.state;
        const { darkTheme } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.top}>
                    <select
                        defaultValue="USD"
                        onChange={this.handleOptionChange}
                        className={combineClassNames(
                            styles.select!,
                            styles.selectDarkTheme!,
                            darkTheme
                        )}>
                        {CurrencyService.getCurrencySymbols().map((symbol) => (
                            <option key={symbol} value={symbol}>
                                {symbol}
                            </option>
                        ))}
                    </select>
                    <div className={styles.row}>
                        <div className={styles.card}>
                            <img
                                src={selectedCard?.icon ?? ""}
                                alt={selectedCard?.symbol ?? ""}
                                className={styles.icon}
                            />
                            <div>
                                <h1
                                    className={combineClassNames(
                                        styles.cardTitle!,
                                        styles.cardTitleDarkTheme!,
                                        darkTheme
                                    )}>
                                    {selectedCard?.title}
                                </h1>
                                <p
                                    className={combineClassNames(
                                        styles.cardText!,
                                        styles.cardTextDarkTheme!,
                                        darkTheme
                                    )}>
                                    {selectedCard?.symbol}
                                </p>
                            </div>
                        </div>
                        <div className={styles.dateSelectors}>
                            <DateSelector
                                name="startDate"
                                defaultValue={-1}
                                handleChange={this.handleStartDateChange}
                            />
                            <DateSelector
                                name="endDate"
                                defaultValue={0}
                                handleChange={this.handleEndDateChange}
                            />
                        </div>
                    </div>
                </div>
                <Chart symbol={selectedCard?.symbol} startDate={startDate} endDate={endDate} />
                <NotificationDisplay notification={this.notification} />
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

const connector = connected(TimelinePage);

export default connector;
