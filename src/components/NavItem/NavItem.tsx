import { FC } from "react";
import { Link, useMatch } from "react-router-dom";

import { useAppSelector } from "@/hooks";

import styles from "./NavItem.module.scss";

interface NavItemProps {
    to: string;
    title: string;
}

export const NavItem: FC<NavItemProps> = ({ to, title }) => {
    const match = useMatch({
        path: to,
        end: to.length === 1,
    });

    const darkTheme = useAppSelector((state) => state.theme.darkTheme);

    const linkStyles = [styles.navItem];
    if (match) {
        linkStyles.push(styles.navItem_active);
    }
    if (darkTheme) {
        linkStyles.push(styles.navItem_dark_theme);
    }

    return (
        <Link to={to} className={linkStyles.join(" ")}>
            {title}
        </Link>
    );
};
