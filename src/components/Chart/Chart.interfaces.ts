/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IProps {
    symbol: string | undefined;
    startDate: string;
    endDate: string;
}

export interface IState {
    data: IReturnCurrencyHistory[];
}

export interface IData {
    datasets: [
        {
            label: string;
            data: IReturnCurrencyHistory[];
            backgroundColor: (ctx: any) => "rgba(22,199,130)" | "rgba(234,57,67)";
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
