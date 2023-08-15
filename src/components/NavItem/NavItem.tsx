import { FC } from "react";
import { Link, useMatch } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";

import { NavItemProps } from "./navItem.interfaces";

import styles from "./navItem.module.scss";

export const NavItem: FC<NavItemProps> = ({ to, title }) => {
    const match = useMatch({
        path: to,
        end: to.length === 1,
    });

    const darkTheme = useAppSelector(themeSelector);

    const linkStyles = [styles.navItem];
    if (match) {
        linkStyles.push(styles.navItemActive);
    }
    if (darkTheme) {
        linkStyles.push(styles.navItemDarkTheme);
    }

    return (
        <Link to={to} className={linkStyles.join(" ")}>
            {title}
        </Link>
    );
};
