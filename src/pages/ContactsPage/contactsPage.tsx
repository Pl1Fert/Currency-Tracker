import { FC } from "react";

import { CONTACTS_LINKS } from "@/constants";
import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";
import { combineClassNames } from "@/utils";

import styles from "./contactsPage.module.scss";

const ContactsPage: FC = () => {
    const darkTheme = useAppSelector(themeSelector);

    const linkStyles = combineClassNames(styles.link!, styles.linkDarkTheme!, darkTheme);

    return (
        <div>
            <div className={styles.row}>
                <a className={linkStyles} href="tel:+375299999999">
                    Phone: +375 (29) 999-99-99
                </a>
                <ul className={styles.list}>
                    {CONTACTS_LINKS.map(({ id, dest, name }) => (
                        <li key={id}>
                            <a href={dest} className={linkStyles} target="_blank" rel="noreferrer">
                                {name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ContactsPage;
