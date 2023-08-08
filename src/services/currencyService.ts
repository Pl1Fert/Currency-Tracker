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
    x: number | undefined;
    o: number;
    h: number;
    l: number;
    c: number;
    s: [number, number];
}

const getCurrencyExchangeRateHistory = async (
    from: string,
    to: string,
    startDate: string,
    endDate: string
): Promise<IReturnCurrencyHistory[]> => {
    try {
        const config = {
            headers: { "X-CoinAPI-Key": "D0173C7B-0070-4483-BA91-A107216CA306" },
        };

        const { data } = await axios.get<ICurrencyHistory[]>(
            `${ENV_VARS.COIN_API_URL}/exchangerate/${from}/${to}/history?period_id=1DAY&time_start=${startDate}T00:00:00&time_end=${endDate}T00:00:00`,
            config
        );

        const array = data.map((item) => ({
            x: new Date(item.time_period_start.slice(0, 10)).setHours(0, 0, 0, 0),
            o: item.rate_open,
            h: item.rate_high,
            l: item.rate_low,
            c: item.rate_close,
            s: [item.rate_open, item.rate_close] as [number, number],
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

const getRandomCurrencies = (): [string, string] => {
    const symbols = getCurrencySymbols();

    const firstSymbol = symbols[Math.floor(Math.random() * symbols.length)] ?? "";
    const secondSymbol = symbols[Math.floor(Math.random() * symbols.length)] ?? "";

    return [firstSymbol, secondSymbol];
};

const getCurrencyRates = async (): Promise<ICurrencyRate[] | undefined> => {
    try {
        const symbols: string[] = getCurrencySymbols();
        const promisesArray: Promise<AxiosResponse<ICurrencyRate, unknown>>[] = symbols.map(
            (symbol) =>
                axios.get<ICurrencyRate>(
                    `${ENV_VARS.CURRENCY_API_URL}/latest?apikey=${ENV_VARS.CURRENCY_API_KEY}&currencies=BRL&base_currency=${symbol}`
                )
        );

        const array = await Promise.all(promisesArray).then((responses) =>
            responses.map((response) => response.data)
        );

        console.log(array);

        return array;
    } catch (error) {
        console.log(error);
    }

    return undefined;
};

// const getCurrencyRates = async (): Promise<Map<string, number>> => {
//     const map = new Map<string, number>();

//     try {
//         const symbols: string[] = getCurrencySymbols();
//         const promisesArray: Promise<AxiosResponse<ICurrencyRate, unknown>>[] = symbols.map(
//             (symbol) =>
//                 axios.get<ICurrencyRate>(
//                     `${ENV_VARS.CURRENCY_URL}/latest?apikey=${ENV_VARS.CURRENCY_API_KEY}&currencies=BRL&base_currency=${symbol}`
//                 )
//         );

// const array: number[] = await Promise.all(promisesArray).then((responses) =>
//     responses.map((response) => response.data.data.BRL.value)
// );

// for (let i = 0; i < symbols.length; i += 1) {
//     map.set(symbols.at(i) as string, array[i] as number);
// }
//     } catch (error) {
//         console.log(error);
//     }

//     return map;
// };

export const CurrencyService = {
    getCurrencyExchangeRate,
    getCurrencyRates,
    getCurrencySymbols,
    getCurrencyExchangeRateHistory,
    getRandomCurrencies,
};
