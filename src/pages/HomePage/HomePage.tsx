import { FC } from "react";
import { useLoaderData } from "react-router-dom";

import { CurrencyCardsRow, StocksCardsRow } from "@/components";
import { QUOTES_CARDS_ROW, STOCKS_CARDS_ROW } from "@/constants";

import styles from "./HomePage.module.scss";

export const HomePage: FC = () => {
    const rates: Map<string, number> = useLoaderData() as Map<string, number>;
    console.log(rates);
    return (
        <div className={styles.container}>
            <StocksCardsRow title={STOCKS_CARDS_ROW.title} cards={STOCKS_CARDS_ROW.cards} />
            <CurrencyCardsRow
                title={QUOTES_CARDS_ROW.title}
                cards={QUOTES_CARDS_ROW.cards}
                rates={rates}
            />
        </div>
    );
};
