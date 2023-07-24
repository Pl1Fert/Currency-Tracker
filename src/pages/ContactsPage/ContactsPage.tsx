import { FC } from "react";

import styles from "./ContactsPage.module.scss";

interface ContactsPageProps {}

export const ContactsPage: FC<ContactsPageProps> = () => (
    <div className={styles.ContactsPage}>ContactsPage Component</div>
);
