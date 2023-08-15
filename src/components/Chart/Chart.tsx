import React from "react";
import { Chart as ChartComponent } from "react-chartjs-2";
import { Chart as ChartJS, registerables, TimeSeriesScale, Tooltip } from "chart.js";

import { CurrencyService } from "@/services";

import "chartjs-adapter-date-fns";

import { ChartConfig } from "./chart.config";
import { IProps, IState } from "./chart.interfaces";

import styles from "./chart.module.scss";

ChartJS.register(Tooltip, TimeSeriesScale, ...registerables);

export class Chart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [
                {
                    x: 0,
                    o: 0,
                    h: 0,
                    l: 0,
                    c: 0,
                    s: [0, 0],
                },
            ],
        };
    }

    override async componentDidMount(): Promise<void> {
        const { symbol, startDate, endDate } = this.props;
        await this.getHistory(symbol, startDate, endDate);
    }

    override async componentDidUpdate(prevProps: IProps): Promise<void> {
        const { symbol, startDate, endDate } = this.props;

        if (
            prevProps.symbol === symbol &&
            prevProps.startDate === startDate &&
            prevProps.endDate === endDate
        ) {
            return;
        }

        await this.getHistory(symbol, startDate, endDate);
    }

    async getHistory(symbol: string | undefined, startDate: string, endDate: string) {
        if (!symbol) {
            throw new Error("error");
        }

        const ratesHistory = await CurrencyService.getCurrencyExchangeRateHistory(
            symbol,
            "BRL",
            startDate,
            endDate
        );

        if (ratesHistory.length === 0) {
            throw new Error("error");
        }

        this.setState((prevState) => ({ ...prevState, data: ratesHistory }));
    }

    getConfig() {
        const config = ChartConfig.data;
        const { data } = this.state;

        return {
            datasets: [
                {
                    label: config.datasets[0].label,
                    data,
                    backgroundColor: config.datasets[0].backgroundColor,
                },
            ],
        };
    }

    override render() {
        return (
            <div className={styles.container}>
                <ChartComponent
                    type="bar"
                    data={this.getConfig()}
                    options={ChartConfig.options}
                    plugins={ChartConfig.plugins}
                />
            </div>
        );
    }
}
