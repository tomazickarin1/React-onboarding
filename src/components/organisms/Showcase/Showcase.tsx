import styles from "./Showcase.module.scss";
import Tabs from "../../molecules/Tabs/Tabs";
import Cards from "../../molecules/Cards/Cards";
import { showcaseLabels } from "../../../data/labels";
import type { RefObject } from "react";

type ShowcaseProps = {
  movies: Array<{ id: number; url: string; title: string; date: string }>;
  isLoading: boolean;
  heading?: string;
  emptyLabel?: string;
  activeTab: number;
  ref: RefObject<HTMLDivElement | null>;
  onTabChange: (id: number) => void;
  tabs?: Array<{ id: number; label: string }>;
};

export default function Showcase({
  movies,
  isLoading,
  activeTab,
  ref,
  onTabChange,
  heading = showcaseLabels.heading,
  emptyLabel = showcaseLabels.empty,
  tabs = showcaseLabels.tabs,
}: ShowcaseProps) {
  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseHeader}>
        <h2>{heading}</h2>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          ref={ref}
        />
      </div>
      {!isLoading && movies.length === 0 ? (
        <p>{emptyLabel}</p>
      ) : (
        <Cards movies={movies} isLoading={isLoading} />
      )}
    </div>
  );
}
