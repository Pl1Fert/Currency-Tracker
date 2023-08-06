import { FC } from "react";

import { CurrencyCardsRow, StocksCardsRow } from "@/components";
import { QUOTES_CARDS_ROW, STOCKS_CARDS_ROW } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { getAllRates } from "../../store/currencySlice";
import styles from "./HomePage.module.scss";

const HomePage: FC = () => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector((state) => state.currency);
    const time = Date.parse(currency.last_updated_at) - Date.now();
    const hours = time / 1000 / 60 / 60;
    if (hours > 12 || !hours) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dispatch(getAllRates());
    }
    const mapRates = new Map<string, number>();
    currency.rates.map((rate) => mapRates.set(rate.symbol, rate.value));
    return (
        <div className={styles.container}>
            <StocksCardsRow title={STOCKS_CARDS_ROW.title} cards={STOCKS_CARDS_ROW.cards} />
            <CurrencyCardsRow
                title={QUOTES_CARDS_ROW.title}
                cards={QUOTES_CARDS_ROW.cards}
                rates={mapRates}
            />
        </div>
    );
};

export default HomePage;
