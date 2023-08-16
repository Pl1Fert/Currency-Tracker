import { FC, useEffect } from "react";

import { CurrencyCardsRow, StocksCardsRow } from "@/components";
import { QUOTES_CARDS_ROW, STOCKS_CARDS_ROW } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { DateService } from "@/services";
import { getAllRates } from "@/store/currencySlice";
import { currencySelector } from "@/store/selectors";
import { makeRatesMap } from "@/utils";

import styles from "./homePage.module.scss";

const HomePage: FC = () => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(currencySelector);

    useEffect(() => {
        if (DateService.isCurrencyDateExpired(currency.last_updated_at)) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            dispatch(getAllRates());
        }
    }, []);

    return (
        <div className={styles.container}>
            <StocksCardsRow title={STOCKS_CARDS_ROW.title} cards={STOCKS_CARDS_ROW.cards} />
            <CurrencyCardsRow
                title={QUOTES_CARDS_ROW.title}
                cards={QUOTES_CARDS_ROW.cards}
                rates={makeRatesMap(currency.rates)}
            />
        </div>
    );
};

export default HomePage;
