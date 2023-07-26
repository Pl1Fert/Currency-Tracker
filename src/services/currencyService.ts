import axios from "axios";

import { CRYPTO_SYMBOLS, ENV_VARS, QUOTES_CARDS_ROW } from "@/constants";

interface ICurrencyConvert {
    success: boolean;
    query: {
        from: string;
        to: string;
        amount: number;
    };
    info: {
        timestamp: number;
        rate: number;
    };
    date: string;
    result: number;
}

interface IRates {
    [key: string]: number;
}

interface ICurrencyRates {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: IRates;
}

interface ICryptoCurrencyRates {
    success: boolean;
    terms: string;
    privacy: string;
    timestamp: number;
    target: string;
    rates: IRates;
}

const getCurrencyConvert = async (
    from: string,
    to: string,
    amount: string
): Promise<string | undefined> => {
    try {
        const { data } = await axios.get<ICurrencyConvert>(
            `${ENV_VARS.CURRENCYLAYER_URL}/convert?access_key=${ENV_VARS.CURRENCYLAYER_API_KEY}&from=${from}&to=${to}&amount=${amount}`
        );

        return data.result.toFixed(2).toString();
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const getCurrencySymbols = (): string => {
    const { cards } = QUOTES_CARDS_ROW;
    const array: string[] = cards.map((card) => card.symbol);

    return array.filter((i) => !CRYPTO_SYMBOLS.includes(i)).join(",");
};

const getCurrencyRates = async (): Promise<IRates | undefined> => {
    try {
        const { data } = await axios.get<ICurrencyRates>(
            `${ENV_VARS.CURRENCYLAYER_URL}/live?access_key=${
                ENV_VARS.CURRENCYLAYER_API_KEY
            }&source=BRL&currencies=${getCurrencySymbols()}&format=1`
        );

        const { rates } = data;
        console.log(data);
        return rates;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const getCryptoCurrencyRates = async () => {
    try {
        const { data } = await axios.get<ICryptoCurrencyRates>(
            `${ENV_VARS.COINLAYER_URL}/live?access_key=${
                ENV_VARS.COINLAYER_API_KEY
            }&target=BRL&symbols=${CRYPTO_SYMBOLS.join(",")}`
        );

        const { rates } = data;
        console.log(data);
        return rates;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export const CurrencyService = {
    getCurrencyConvert,
    getCurrencyRates,
    getCryptoCurrencyRates,
};
