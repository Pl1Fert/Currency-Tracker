import { ICurrencyCard } from "@/interfaces/cardsTypes";

export interface CurrencyCardsRowProps {
    title: string;
    cards: ICurrencyCard[];
    rates?: Map<string, number>;
}
