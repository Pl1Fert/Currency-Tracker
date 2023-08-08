import { ICurrencyCard } from "@/types/cardsTypes";

export interface CurrencyCardsRowProps {
    title: string;
    cards: ICurrencyCard[];
    rates?: Map<string, number>;
}
