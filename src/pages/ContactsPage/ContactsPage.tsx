import { FC } from "react";

import { useAppSelector } from "@/hooks";
import { themeSelector } from "@/store/selectors";

import styles from "./contactsPage.module.scss";

interface ContactsPageProps {}

const ContactsPage: FC<ContactsPageProps> = () => {
    const darkTheme = useAppSelector(themeSelector);

    const linkStyles = darkTheme ? `${styles.link} ${styles.linkDarkTheme}` : `${styles.link}`;

    return (
        <div>
            <div className={styles.row}>
                <a className={linkStyles} href="tel:+375299999999">
                    Phone: +375 (29) 999-99-99
                </a>
                <ul className={styles.list}>
                    <li>
                        <a className={linkStyles} href="https://www.youtube.com/">
                            YouTube
                        </a>
                    </li>
                    <li>
                        <a className={linkStyles} href="https://www.facebook.com/">
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a className={linkStyles} href="https://www.instagram.com/">
                            Instagram
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ContactsPage;
