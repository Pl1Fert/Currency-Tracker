import { memo } from "react";

import { CurrencyCard } from "@/components";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";
import { combineClassNames } from "@/utils";

import { CurrencyCardsRowProps } from "./currencyCardsRow.interfaces";

import styles from "./currencyCardsRow.module.scss";

export const CurrencyCardsRow = memo<CurrencyCardsRowProps>(({ title, cards, rates }) => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <section>
            <p className={combineClassNames(styles.title!, styles.titleDarkTheme!, darkTheme)}>
                {title}
            </p>
            <hr className={styles.border} />
            <div className={styles.cardsRow}>
                {cards.map((card) => (
                    <CurrencyCard
                        key={card.id}
                        card={card}
                        text={
                            rates?.get(card.symbol)
                                ? `R$ ${rates?.get(card.symbol)?.toFixed(2)}`
                                : undefined
                        }
                    />
                ))}
            </div>
        </section>
    );
});
