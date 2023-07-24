import { FC, SyntheticEvent } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { NavList } from "@/components";
import { AppRoutes } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { themeActions } from "@/store/themeSlice";

import styles from "./NavBar.module.scss";

export const NavBar: FC = () => {
    const dispatch = useAppDispatch();
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);

    const handleClick = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        if (target.value === darkTheme.toString()) {
            return;
        }

        dispatch(themeActions.toggleTheme());
    };

    return (
        <nav className={styles.navBar}>
            <Link to={AppRoutes.HOME}>
                <img src={logo} alt="logo" />
            </Link>
            <NavList />
            <div
                className={
                    darkTheme ? `${styles.radios} ${styles.radios_dark_theme}` : `${styles.radios}`
                }>
                <input
                    type="radio"
                    id={styles.falseRadio}
                    className={styles.input}
                    name="theme"
                    value="false"
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
