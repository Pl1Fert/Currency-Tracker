import { memo } from "react";

import { FooterItem } from "@/components";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";
import { combineClassNames } from "@/utils";

import { FooterListProps } from "./footerList.interfaces";

import styles from "./footerList.module.scss";

export const FooterList = memo<FooterListProps>(({ title, links }) => {
    const darkTheme = useAppSelector(themeSelector);

    return (
        <div className={styles.container}>
            <h2 className={combineClassNames(styles.title!, styles.titleDarkTheme!, darkTheme)}>
                {title}
            </h2>
            <ul className={styles.list}>
                {links.map(({ id, title: footerTitle }) => (
                    <li key={id}>
                        <FooterItem title={footerTitle} />
                    </li>
                ))}
            </ul>
        </div>
    );
});
