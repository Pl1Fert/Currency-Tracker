import { FC } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { NavList } from "@/components";
import { AppRoutes } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { themeActions } from "@/store/themeSlice";

import styles from "./NavBar.module.scss";

export const NavBar: FC = () => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(themeActions.toggleTheme());
    };

    return (
        <nav className={styles.navBar}>
            <Link to={AppRoutes.HOME}>
                <img src={logo} alt="logo" />
            </Link>
            <NavList />
            <button type="button" onClick={handleClick}>
                Change Theme
            </button>
        </nav>
    );
};
