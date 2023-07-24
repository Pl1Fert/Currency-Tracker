import { FC } from "react";
import { Link } from "react-router-dom";

import { AppRoutes } from "@/constants";

import styles from "./FooterItem.module.scss";

interface FooterItemProps {
    title: string;
}

export const FooterItem: FC<FooterItemProps> = ({ title }) => (
    <Link to={AppRoutes.HOME} className={styles.link}>
        {title}
    </Link>
);
