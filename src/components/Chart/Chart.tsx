/* eslint-disable simple-import-sort/imports */

import { Chart as ChartJS, registerables, TimeSeriesScale, Tooltip } from "chart.js";
import { Chart as ChartComponent } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import React from "react";

import { IProps, IState } from "./Chart.interfaces";

import styles from "./Chart.module.scss";
import { ChartConfig } from "./Chart.config";
import { CurrencyService } from "@/services";

ChartJS.register(Tooltip, TimeSeriesScale, ...registerables);

// eslint-disable-next-line react/prefer-stateless-function
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
