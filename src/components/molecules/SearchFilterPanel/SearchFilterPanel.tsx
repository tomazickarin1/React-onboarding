import styles from "./SearchFilterPanel.module.scss";

type searchFilterPanelProps = {
  children: React.ReactNode;
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
