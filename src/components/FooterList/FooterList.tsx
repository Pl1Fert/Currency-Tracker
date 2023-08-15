import { FC } from "react";

import { FooterItem } from "@/components";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";

import { FooterListProps } from "./footerList.interfaces";

import styles from "./footerList.module.scss";

export const FooterList: FC<FooterListProps> = ({ title, links }) => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <div className={styles.container}>
            <h2
                className={
                    darkTheme ? `${styles.titleDarkTheme} ${styles.title}` : `${styles.title}`
                }>
                {title}
            </h2>
            <ul className={styles.list}>
                {links.map((link) => (
                    <li key={link.id}>
                        <FooterItem title={link.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
