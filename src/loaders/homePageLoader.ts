import { CurrencyService } from "@/services/currencyService";

export const homePageLoader = async (): Promise<Map<string, number>> => {
    const currencyRates = await CurrencyService.getCurrencyRates();
    const cryptoCurrencyRates = await CurrencyService.getCryptoCurrencyRates();
    const obj = { ...currencyRates, ...cryptoCurrencyRates };
    console.log(obj);
    const map = new Map<string, number>(Object.entries(obj));

    return map;
};
