import { FC } from "react";
import { Link } from "react-router-dom";

import { AppRoutes } from "@/constants";

import { FooterItemProps } from "./footerItem.interfaces";

import styles from "./footerItem.module.scss";

export const FooterItem: FC<FooterItemProps> = ({ title }) => (
    <Link to={AppRoutes.HOME} className={styles.link}>
        {title}
    </Link>
);
