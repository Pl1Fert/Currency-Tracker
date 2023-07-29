interface ICard {
    id: number;
    title: string;
    icon: string;
}

export interface StockCardProps {
    card: ICard;
    text?: string;
}
