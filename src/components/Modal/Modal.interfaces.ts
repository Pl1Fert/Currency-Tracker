import { ICurrencyCard } from "@/types/cardsTypes";

export interface ModalProps {
    closeModal: () => void;
    card: ICurrencyCard;
}

export interface IState {
    currencyAmount: number;
    amountInFromCurrency: boolean;
    toCurrencyOption: string;
    exchangeRate: number;
}
