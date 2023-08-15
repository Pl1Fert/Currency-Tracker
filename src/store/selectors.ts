import { ICurrencyRates } from "@/interfaces/currencyTypes";

interface ITheme {
    darkTheme: boolean;
}

interface IModal {
    cardIdToOpenModal: number;
}

interface IState {
    theme: ITheme;
    currency: ICurrencyRates;
    modal: IModal;
}

export const themeSelector = (state: IState) => state.theme.darkTheme;
export const currencySelector = (state: IState) => state.currency;
export const modalSelector = (state: IState) => state.modal.cardIdToOpenModal;
