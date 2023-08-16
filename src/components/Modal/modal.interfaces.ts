import { ICurrencyCard } from "@/interfaces/cardsTypes";

export interface ModalProps {
    card: ICurrencyCard;
}

export interface IState {
    currencyAmount: number;
    amountInFromCurrency: boolean;
    toCurrencyOption: string;
    exchangeRate: number;
}
