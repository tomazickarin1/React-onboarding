import styles from "./Showcase.module.scss";
import { useState } from "react";
import Tabs from "../../molecules/Tabs/Tabs";
import Cards from "../../molecules/Cards/Cards";

interface ShowcaseProps {
  movies: Array<{ id: number; url: string; title: string; date: string }>;
  isLoading: boolean;
}

export default function Showcase({movies, isLoading}: ShowcaseProps) {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Streaming" },
    { id: 2, label: "On TV" },
    { id: 3, label: "For Rent" },
    { id: 4, label: "In Theatres" },
  ];

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseHeader}>
        <h2>What&apos;s popular</h2>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <Cards movies={movies} isLoading={isLoading} />
    </div>
  );
}
