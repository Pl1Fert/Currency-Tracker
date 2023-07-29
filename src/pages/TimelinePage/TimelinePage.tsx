import { FC } from "react";

import styles from "./TimelinePage.module.scss";

interface TimelinePageProps {}

const TimelinePage: FC<TimelinePageProps> = () => (
    <div className={styles.TimelinePage}>TimelinePage Component</div>
);

export default TimelinePage;
