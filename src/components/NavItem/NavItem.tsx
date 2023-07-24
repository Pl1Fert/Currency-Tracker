import { FC } from "react";
import { Link, useMatch } from "react-router-dom";

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

    const linkStyles = match ? `${styles.navItem} ${styles.navItem_active}` : `${styles.navItem}`;

    return (
        <Link to={to} className={linkStyles}>
            {title}
        </Link>
    );
};
