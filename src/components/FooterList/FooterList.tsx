import { FC } from "react";

import { FooterItem } from "@/components";
import { useAppSelector } from "@/hooks";

import { FooterListProps } from "./FooterList.interfaces";
import styles from "./FooterList.module.scss";

export const FooterList: FC<FooterListProps> = ({ title, links }) => {
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);

    const titleStyles = darkTheme ? `${styles.titleDarkTheme} ${styles.title}` : `${styles.title}`;

    return (
        <div>
            <h2 className={titleStyles}>{title}</h2>
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
