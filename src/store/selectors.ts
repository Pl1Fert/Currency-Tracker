import { ICurrencyRates } from "@/interfaces/currencyTypes";

interface ITheme {
    darkTheme: boolean;
}

interface IState {
    theme: ITheme;
    currency: ICurrencyRates;
}

export const themeSelector = (state: IState) => state.theme.darkTheme;
export const currencySelector = (state: IState) => state.currency;
