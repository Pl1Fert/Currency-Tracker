import { FC, SyntheticEvent } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { NavList } from "@/components";
import { AppRoutes } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";
import { themeActions } from "@/store/themeSlice";
import { combineClassNames } from "@/utils";

import styles from "./navBar.module.scss";

export const NavBar: FC = () => {
    const dispatch = useAppDispatch();
    const darkTheme = useAppSelector(themeSelector);

    const handleClick = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        if (target.value === darkTheme.toString()) {
            return;
        }

        dispatch(themeActions.toggleTheme());
    };

    return (
        <nav className={styles.navBar}>
            <Link to={AppRoutes.HOME}>
                <img src={logo} alt="logo" className={styles.logo} />
            </Link>
            <NavList />
            <div className={combineClassNames(styles.radios!, styles.radiosDarkTheme!, darkTheme)}>
                <input
                    type="radio"
                    id={styles.falseRadio}
                    className={styles.input}
                    name="theme"
                    value="false"
                    defaultChecked={!darkTheme}
                    onClick={handleClick}
                />
                <input
                    type="radio"
                    id={styles.trueRadio}
                    className={styles.input}
                    name="theme"
                    value="true"
                    defaultChecked={darkTheme}
                    onClick={handleClick}
                />
            </div>
        </nav>
    );
};
