import { IReturnCurrencyHistory } from "@/interfaces/currencyTypes";

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
            backgroundColor: (ctx: any) => string;
        },
    ];
}
