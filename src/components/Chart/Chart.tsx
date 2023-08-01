import "chartjs-adapter-luxon";

import { Chart as ChartJS, registerables, TimeSeriesScale, Tooltip } from "chart.js";
import {
    CandlestickController,
    CandlestickElement,
    OhlcController,
    OhlcElement,
} from "chartjs-chart-financial";
import { DateTime } from "luxon";
import React from "react";
import { Chart as ChartComponent } from "react-chartjs-2";

import { IProps, IState } from "./Chart.interfaces";

// import styles from "./Chart.module.scss";

ChartJS.register(
    Tooltip,
    CandlestickController,
    CandlestickElement,
    OhlcController,
    OhlcElement,
    TimeSeriesScale,
    ...registerables
);

// eslint-disable-next-line react/prefer-stateless-function
export class Chart extends React.Component<IProps, IState> {
    override render() {
        const { card } = this.props;
        const data = {
            datasets: [
                {
                    data: [
                        {
                            x: DateTime.now().valueOf(),
                            o: 2,
                            h: 3,
                            l: 4,
                            c: 5,
                        },
                        {
                            x: DateTime.fromISO("2023-07-25").valueOf(),
                            o: 7,
                            h: 8,
                            l: 9,
                            c: 10,
                        },
                        {
                            x: DateTime.fromISO("2023-07-27").valueOf(),
                            o: 12,
                            h: 13,
                            l: 14,
                            c: 15,
                        },
                    ],
                },
            ],
        };

        return (
            <div>
                <div>
                    <div>
                        <img src={card?.icon ?? ""} alt={card?.symbol} />
                        <h1>{card?.title}</h1>
                        <p>{card?.symbol}</p>
                    </div>
                    <ChartComponent type="candlestick" data={data} />
                </div>
            </div>
        );
    }
}
