import { ICurrencyRate } from "@/interfaces/currencyTypes";

export const getFilteredSymbols = (symbols: string[], inputValue: string): string[] =>
    symbols
        .filter((symbol) => symbol.toLowerCase().includes(inputValue.toLowerCase()))
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

export const calculateDateDiff = (startDate: string, endDate: string): number => {
    const diff = Date.parse(endDate) - Date.parse(startDate);
    return diff / 1000 / 3600 / 24;
};

export const makeRatesMap = (rates: ICurrencyRate[]): Map<string, number> => {
    const mapRates = new Map<string, number>();

    rates.map((rate) => mapRates.set(rate.symbol, rate.value));

    return mapRates;
};
