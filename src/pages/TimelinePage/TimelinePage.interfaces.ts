import { ICurrencyCard } from "@/components/components.interfaces";

export interface IState {
    selectedCard: ICurrencyCard | undefined;
}

export type IProps = Record<string, never>;
