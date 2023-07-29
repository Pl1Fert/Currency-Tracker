import { ICurrencyCard } from "../components.interfaces";

export interface CurrencyCardsRowProps {
    title: string;
    cards: ICurrencyCard[];
    rates?: Map<string, number>;
}
