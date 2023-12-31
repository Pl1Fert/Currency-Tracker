import { FC } from "react";

import logo from "@/assets/logo.svg";
import { FooterList } from "@/components";
import { FOOTER_LISTS } from "@/constants";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";
import { combineClassNames } from "@/utils";

import styles from "./footer.module.scss";

export const Footer: FC = () => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <footer className={styles.footer}>
            <div className={styles.footerRow}>
                <div className={styles.footerContent}>
                    <div className={styles.footerTitleRow}>
                        <img src={logo} alt="logo" />
                        <h1 className={styles.footerTitle}>Modsen Currency Tracker</h1>
                    </div>
                    <p
                        className={combineClassNames(
                            styles.footerText!,
                            styles.footerTextDarkTheme!,
                            darkTheme
                        )}>
                        Since then, the company has grown organically to. Starsup is the
                        world&apos;s largest trading platform, with $12 billion worth of currency
                        trading and 500,000 tickets sold daily to tens of thousands of traders
                        worldwide.
                    </p>
                </div>
                <div className={styles.footerAccordion}>
                    {FOOTER_LISTS.map((list) => (
                        <FooterList key={list.id} title={list.title} links={list.links} />
                    ))}
                </div>
            </div>
            <p className={styles.footerSign}>Startsup © 2023-2024, All Rights Reserved</p>
        </footer>
    );
};
