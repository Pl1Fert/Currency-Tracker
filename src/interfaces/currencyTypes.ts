export interface ICurrencyRateResponse {
    meta: {
        last_updated_at: string;
    };
    data: {
        BRL: {
            code: string;
            value: number;
        };
    };
}

export interface ICurrencyConvert {
    meta: {
        last_updated_at: string;
    };
    data: {
        [key: string]: {
            code: string;
            value: number;
        };
    };
}

export interface ICurrencyRate {
    symbol: string;
    value: number;
}

export interface ICurrencyRates {
    last_updated_at: string;
    rates: ICurrencyRate[];
}

export interface ICurrencyHistory {
    time_period_start: string;
    time_period_end: string;
    time_open: string;
    time_close: string;
    rate_open: number;
    rate_high: number;
    rate_low: number;
    rate_close: number;
}

export interface IReturnCurrencyHistory {
    x: number | undefined;
    o: number;
    h: number;
    l: number;
    c: number;
    s: [number, number];
}
