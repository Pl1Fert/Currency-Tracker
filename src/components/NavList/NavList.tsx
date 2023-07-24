import { FC } from "react";

import { NavItem } from "@/components";
import { NAV_LINKS } from "@/constants";

import styles from "./NavList.module.scss";

export const NavList: FC = () => (
    <ul className={styles.navList}>
        {NAV_LINKS.map((link) => (
            <li key={link.id}>
                <NavItem to={link.dest} title={link.title} />
            </li>
        ))}
    </ul>
);
