import AustralianDollar from "@/assets/icons/Australian Dollar Icon.svg";
import Bitcoin from "@/assets/icons/Bitcoin Icon.svg";
import CanadianDollar from "@/assets/icons/Canadian Dollar Icon.svg";
import Dollar from "@/assets/icons/Dollar Icon.svg";
import Euro from "@/assets/icons/Euro Icon.svg";
import Libra from "@/assets/icons/Libra Icon.svg";
import ArgentinePeso from "@/assets/icons/Peso Argentino Icon.svg";
import Yuan from "@/assets/icons/Won Icon.svg";
import Yen from "@/assets/icons/Yen Icon.svg";

export const QUOTES_CARDS = [
    {
        id: 1,
        title: "Commercial Dollar",
        icon: Dollar,
        symbol: "USD",
    },
    {
        id: 2,
        title: "Argentine Peso",
        icon: ArgentinePeso,
        symbol: "ARS",
    },
    {
        id: 3,
        title: "Canadian Dollar",
        icon: CanadianDollar,
        symbol: "CAD",
    },
    {
        id: 4,
        title: "Yen",
        icon: Yen,
        symbol: "JPY",
    },
    {
        id: 5,
        title: "Australian Dollar",
        icon: AustralianDollar,
        symbol: "AUD",
    },
    {
        id: 6,
        title: "Yuan",
        icon: Yuan,
        symbol: "CNY",
    },
    {
        id: 7,
        title: "Euro",
        icon: Euro,
        symbol: "EUR",
    },
    {
        id: 8,
        title: "Bitcoin",
        icon: Bitcoin,
        symbol: "BTC",
    },
    {
        id: 9,
        title: "Libra",
        icon: Libra,
        symbol: "ETH",
    },
];

export const QUOTES_CARDS_ROW = {
    title: "Quotes",
    cards: QUOTES_CARDS,
};
