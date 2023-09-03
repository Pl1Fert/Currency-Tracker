import { FC } from "react";

import { NavItem } from "@/components";
import { NAV_LINKS } from "@/constants";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";
import { combineClassNames } from "@/utils";

import styles from "./navList.module.scss";

export const NavList: FC = () => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <div>
            <input id={styles.menuToggle} type="checkbox" />
            <label className={styles.menuBtn} htmlFor={styles.menuToggle}>
                <span />
            </label>
            <ul className={combineClassNames(styles.navList!, styles.navListDarkTheme!, darkTheme)}>
                {NAV_LINKS.map(({ id, dest, title }) => (
                    <li key={id}>
                        <NavItem to={dest} title={title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
