import { FC } from "react";

import logo from "@/assets/logo.svg";
import { FooterList } from "@/components";
import { FOOTER_LISTS } from "@/constants";

import styles from "./Footer.module.scss";

export const Footer: FC = () => (
    <footer className={styles.footer}>
        <div className={styles.footer_row}>
            <div className={styles.footer_content}>
                <div className={styles.footer_title_row}>
                    <img src={logo} alt="logo" />
                    <h1 className={styles.footer_title}>Modsen Currency Tracker</h1>
                </div>
                <p className={styles.footer_text}>
                    Since then, the company has grown organically to. Starsup is the world&apos;s
                    largest trading platform, with $12 billion worth of currency trading and 500,000
                    tickets sold daily to tens of thousands of traders worldwide.
                </p>
            </div>
            <div className={styles.footer_accordion}>
                {FOOTER_LISTS.map((list) => (
                    <FooterList key={list.id} title={list.title} links={list.links} />
                ))}
            </div>
        </div>
        <p className={styles.footer_sign}>Startsup © 2023-2024, All Rights Reserved</p>
    </footer>
);
