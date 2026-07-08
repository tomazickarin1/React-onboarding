import styles from "./SearchFilterPanel.module.scss";
import type { ReactNode } from "react";

type searchFilterPanelProps = {
  children: ReactNode;
}

export default function SearchFilterPanel({
  children,
}: searchFilterPanelProps) {
  return (
    <div className={styles.searchFilters}>
      <div className={styles.searchHeader}>
        <h3>Search Results</h3>
      </div>
      <div>
        <ul>{children}</ul>
      </div>
    </div>
  );
}
