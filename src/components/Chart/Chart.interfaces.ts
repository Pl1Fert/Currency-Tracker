/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IProps {
    symbol: string | undefined;
}

export interface IState {
    data: IReturnCurrencyHistory[];
}

export interface IData {
    datasets: [
        {
            label: string;
            data: IReturnCurrencyHistory[];
            backgroundColor: (ctx: any) => "rgba(75,192,192)" | "rgba(255,26,104)";
        },
    ];
}

export interface IReturnCurrencyHistory {
    x: number | undefined;
    o: number;
    h: number;
    l: number;
    c: number;
    s: [number, number];
}
