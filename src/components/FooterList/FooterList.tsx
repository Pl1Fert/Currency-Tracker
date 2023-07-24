import { FC } from "react";

import { FooterItem } from "@/components";

import styles from "./FooterList.module.scss";

interface FooterListItem {
    id: number;
    title: string;
}

interface FooterListProps {
    title: string;
    links: FooterListItem[];
}

export const FooterList: FC<FooterListProps> = ({ title, links }) => (
    <div>
        <h2 className={styles.title}>{title}</h2>
        <ul className={styles.list}>
            {links.map((link) => (
                <li key={link.id}>
                    <FooterItem title={link.title} />
                </li>
            ))}
        </ul>
    </div>
);
