import styles from "./Showcase.module.scss";
import { useState } from "react";
import placeholder from "../../../assets/placeholder.jpg";
import Tabs from "../../molecules/Tabs/Tabs";

export default function Showcase() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Streaming" },
    { id: 2, label: "On TV" },
    { id: 3, label: "For Rent" },
    { id: 4, label: "In Theatres" },
  ];

  return (
    <>
      <div className={styles.showcaseHeader}>
        <h2>What&apos;s popular</h2>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className={styles.showcaseCards}>
        <div className={styles.showcaseCard}>
          <img src={placeholder} alt="" />
          <h3>The Boys</h3>
          <div>25 July 2019</div>
        </div>
        <div className={styles.showcaseCard}>
          <img src={placeholder} alt="" />
          <h3>The Boys</h3>
          <div>25 July 2019</div>
        </div>
        <div className={styles.showcaseCard}>
          <img src={placeholder} alt="" />
          <h3>The Boys</h3>
          <div>25 July 2019</div>
        </div>
      </div>
    </>
  );
}
