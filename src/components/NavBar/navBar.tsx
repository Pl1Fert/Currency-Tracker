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

    const radiosConfig = [
        {
            id: styles.falseRadio,
            value: "false",
            defaultChecked: !darkTheme,
        },
        {
            id: styles.trueRadio,
            value: "true",
            defaultChecked: darkTheme,
        },
    ];

    return (
        <nav className={styles.navBar}>
            <Link to={AppRoutes.HOME}>
                <img src={logo} alt="logo" className={styles.logo} />
            </Link>
            <NavList />
            <div className={combineClassNames(styles.radios!, styles.radiosDarkTheme!, darkTheme)}>
                {radiosConfig.map(({ id, value, defaultChecked }) => (
                    <input
                        type="radio"
                        className={styles.input}
                        name="theme"
                        onClick={handleClick}
                        id={id}
                        value={value}
                        defaultChecked={defaultChecked}
                    />
                ))}
            </div>
        </nav>
    );
};
