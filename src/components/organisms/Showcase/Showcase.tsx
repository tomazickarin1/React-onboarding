import styles from "./Showcase.module.scss";
import { useState } from "react";
import Tabs from "../../molecules/Tabs/Tabs";
import Cards from "../../molecules/Cards/Cards";

export default function Showcase() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Streaming" },
    { id: 2, label: "On TV" },
    { id: 3, label: "For Rent" },
    { id: 4, label: "In Theatres" },
  ];

  const cards = [
    { id: 1, title: "Streaming", url: "/", date: "nov 15" },
    { id: 2, title: "On TV", url: "/", date: "nov 15" },
    { id: 3, title: "For Rent", url: "/", date: "nov 15" },
    { id: 4, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 5, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 6, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 7, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 8, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 9, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 10, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 11, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 12, title: "In Theatres", url: "/", date: "nov 15" },
  ];

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseHeader}>
        <h2>What&apos;s popular</h2>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <Cards cards={cards} />
    </div>
  );
}
