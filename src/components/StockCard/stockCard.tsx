import { memo } from "react";

import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";
import { combineClassNames } from "@/utils";

import { StockCardProps } from "./stockCard.interfaces";

import styles from "./stockCard.module.scss";

export const StockCard = memo<StockCardProps>(({ text = "No Info", card: { icon, title } }) => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <div
            className={combineClassNames(styles.stockCard!, styles.stockCardDarkTheme!, darkTheme)}>
            <div>
                <img src={icon} alt="title" className={styles.icon} />
            </div>
            <div>
                <p
                    className={combineClassNames(
                        styles.cardTitle!,
                        styles.cardTitleDarkTheme!,
                        darkTheme
                    )}>
                    {title}
                </p>
                <p
                    className={combineClassNames(
                        styles.cardText!,
                        styles.cardTextDarkTheme!,
                        darkTheme
                    )}>
                    {text}
                </p>
            </div>
        </div>
    );
});
