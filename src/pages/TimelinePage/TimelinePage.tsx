import { Component, SyntheticEvent } from "react";
import { connect, ConnectedProps } from "react-redux";

import { Chart, Notification, NotificationDisplay } from "@/components";
import { ICurrencyCard } from "@/components/components.interfaces";
import { QUOTES_CARDS_ROW } from "@/constants";
import { CurrencyService, DateService } from "@/services";
import { RootState } from "@/store";

import { IProps, IState } from "./TimelinePage.interfaces";
import styles from "./TimelinePage.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
class TimelinePage extends Component<Props, IState> {
    private cards = QUOTES_CARDS_ROW.cards;

    private notification = new Notification();

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedCard: this.cards.at(0),
            dates: DateService.getPreviousDates(),
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

    handleStartDateChange = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        const { endDate } = this.state;
        this.notification.setDiff(DateService.calculateDateDiff(target.value, endDate));
        this.setState((prevState) => ({ ...prevState, startDate: target.value }));
    };

    handleEndDateChange = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        const { startDate } = this.state;
        this.notification.setDiff(DateService.calculateDateDiff(startDate, target.value));
        this.setState((prevState) => ({ ...prevState, endDate: target.value }));
    };

    override render() {
        const { selectedCard, dates, startDate, endDate } = this.state;
        const { darkTheme } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.top}>
                    <select
                        defaultValue="USD"
                        onChange={this.handleOptionChange}
                        className={
                            darkTheme
                                ? `${styles.select} ${styles.selectDarkTheme}`
                                : `${styles.select}`
                        }>
                        {CurrencyService.getCurrencySymbols().map((symbol) => (
                            <option key={symbol} value={symbol}>
                                {symbol}
                            </option>
                        ))}
                    </select>
                    <div className={styles.row}>
                        <div className={styles.card}>
                            <img src={selectedCard?.icon ?? ""} alt={selectedCard?.symbol} />
                            <div>
                                <h1
                                    className={
                                        darkTheme
                                            ? `${styles.cardTitle} ${styles.cardTitleDarkTheme}`
                                            : `${styles.cardTitle}`
                                    }>
                                    {selectedCard?.title}
                                </h1>
                                <p
                                    className={
                                        darkTheme
                                            ? `${styles.cardText} ${styles.cardTextDarkTheme}`
                                            : `${styles.cardText}`
                                    }>
                                    {selectedCard?.symbol}
                                </p>
                            </div>
                        </div>
                        <div className={styles.dateSelectors}>
                            <select
                                name="startDate"
                                defaultValue={dates.at(-1)}
                                onChange={this.handleStartDateChange}
                                className={
                                    darkTheme
                                        ? `${styles.dateSelector} ${styles.dateSelectorDarkTheme}`
                                        : `${styles.dateSelector}`
                                }>
                                {dates.map((date) => (
                                    <option value={date} key={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="endDate"
                                defaultValue={dates.at(0)}
                                onChange={this.handleEndDateChange}
                                className={
                                    darkTheme
                                        ? `${styles.dateSelector} ${styles.dateSelectorDarkTheme}`
                                        : `${styles.dateSelector}`
                                }>
                                {dates.map((date) => (
                                    <option value={date} key={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
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
