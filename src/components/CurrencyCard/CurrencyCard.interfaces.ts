import { ICurrencyCard } from "@/types/cardsTypes";

export interface CurrencyCardProps {
    card: ICurrencyCard;
    text?: string;
    modal: {
        cardIdToOpenModal: number;
        closeModal: () => void;
        openModal: (id: number) => void;
    };
}
