/* eslint-disable @typescript-eslint/unbound-method */
import { FC, useEffect, useState } from "react";

import { INotification } from "@/components/Notification/notification.interfaces";

import styles from "./NotificationDisplay.module.scss";

interface IProps {
    notification: INotification;
}

export const NotificationDisplay: FC<IProps> = ({ notification }) => {
    const [diff, setDiff] = useState(30);

    useEffect(() => {
        notification.subscribe(setDiff);

        return () => notification.unsubscribe(setDiff);
    }, [notification]);

    return diff >= 29 ? <div className={styles.notification}>Chart for 30 days created</div> : null;
};
