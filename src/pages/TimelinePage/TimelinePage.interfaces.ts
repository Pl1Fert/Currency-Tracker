import { ICurrencyCard } from "@/interfaces/cardsTypes";

export interface IState {
    selectedCard: ICurrencyCard | undefined;
    startDate: string;
    endDate: string;
}

export type IProps = Record<string, never>;
