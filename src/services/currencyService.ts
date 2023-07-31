import axios, { AxiosResponse } from "axios";

import { ENV_VARS, QUOTES_CARDS_ROW } from "@/constants";

interface ICurrencyRate {
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

interface ICurrencyConvert {
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

interface ICurrencyHistory {
    time_period_start: string;
    time_period_end: string;
    time_open: string;
    time_close: string;
    rate_open: number;
    rate_high: number;
    rate_low: number;
    rate_close: number;
}

interface IReturnCurrencyHistory {
    date: string | undefined;
    open: number;
    high: number;
    low: number;
    close: number;
}

const getCurrencyExchangeRateHistory = async (
    from: string,
    to: string
): Promise<IReturnCurrencyHistory[]> => {
    try {
        const { data } = await axios.get<ICurrencyHistory[]>(
            `${ENV_VARS.COIN_API_URL}/exchangerate/${from}/${to}/history?period_id=1DAY&time_start=2023-05-01T00:00:00&time_end=2023-06-01T00:00:00`
        );

        const array = data.map((item) => ({
            date: item.time_period_start.split("T").at(0),
            open: item.rate_open,
            high: item.rate_high,
            low: item.rate_low,
            close: item.rate_close,
        }));

        return array;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getCurrencyExchangeRate = async (from: string, to: string): Promise<number> => {
    try {
        const { data } = await axios.get<ICurrencyConvert>(
            `${ENV_VARS.CURRENCY_API_URL}/latest?apikey=${ENV_VARS.CURRENCY_API_KEY}&currencies=${to}&base_currency=${from}`
        );

        return data.data[`${to}`]!.value;
    } catch (error) {
        console.log(error);
        return 1;
    }
};

const getCurrencySymbols = (): string[] => {
    const { cards } = QUOTES_CARDS_ROW;

    return cards.map((card): string => card.symbol);
};

const getCurrencyRates = async (): Promise<Map<string, number>> => {
    const map = new Map<string, number>();

    try {
        const symbols: string[] = getCurrencySymbols();
        const promisesArray: Promise<AxiosResponse<ICurrencyRate, unknown>>[] = symbols.map(
            (symbol) =>
                axios.get<ICurrencyRate>(
                    `${ENV_VARS.CURRENCY_API_URL}/latest?apikey=${ENV_VARS.CURRENCY_API_KEY}&currencies=BRL&base_currency=${symbol}`
                )
        );

        const array: number[] = await Promise.all(promisesArray).then((responses) =>
            responses.map((response) => response.data.data.BRL.value)
        );

        for (let i = 0; i < symbols.length; i += 1) {
            map.set(symbols.at(i) as string, array[i] as number);
        }
    } catch (error) {
        console.log(error);
    }

    return map;
};

export const CurrencyService = {
    getCurrencyExchangeRate,
    getCurrencyRates,
    getCurrencySymbols,
    getCurrencyExchangeRateHistory,
};
