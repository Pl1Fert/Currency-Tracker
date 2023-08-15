import { ICurrencyCard } from "@/interfaces/cardsTypes";

export interface IState {
    selectedCard: ICurrencyCard | undefined;
    dates: string[];
    startDate: string;
    endDate: string;
}

export type IProps = Record<string, never>;
