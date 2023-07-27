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

const getCurrencyConvert = async (from: string, to: string): Promise<number | undefined> => {
    try {
        const { data } = await axios.get<ICurrencyConvert>(
            `${ENV_VARS.CURRENCY_URL}/latest?apikey=${ENV_VARS.CURRENCY_API_KEY}&currencies=${to}&base_currency=${from}`
        );

        return data.data[`${from}`]!.value;
    } catch (error) {
        console.log(error);

        return undefined;
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
                    `${ENV_VARS.CURRENCY_URL}/latest?apikey=${ENV_VARS.CURRENCY_API_KEY}&currencies=BRL&base_currency=${symbol}`
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
    getCurrencyConvert,
    getCurrencyRates,
};
