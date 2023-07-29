import { CurrencyService } from "@/services";

export const homePageLoader = async (): Promise<Map<string, number>> => {
    const currencyRates = await CurrencyService.getCurrencyRates();

    return currencyRates;
};
