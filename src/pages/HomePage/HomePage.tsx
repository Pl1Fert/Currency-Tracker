import { FC } from "react";

import { CurrencyCardsRow } from "@/components";
import { QUOTES_CARDS_ROW, STOCKS_CARDS_ROW } from "@/constants";

import styles from "./HomePage.module.scss";

export const HomePage: FC = () => (
    <div className={styles.container}>
        <CurrencyCardsRow title={STOCKS_CARDS_ROW.title} cards={STOCKS_CARDS_ROW.cards} />
        <CurrencyCardsRow title={QUOTES_CARDS_ROW.title} cards={QUOTES_CARDS_ROW.cards} />
    </div>
);
