import styles from "./SearchResults.module.scss";
import Icon from "../../atoms/Icon/Icon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type SearchResultsProps = {
  movieList: Array<{ id: number; title: string }>;
  handleSearch: (title: string) => void;
};

export default function SearchResults({
  movieList,
  handleSearch,
}: SearchResultsProps) {
  return (
    <ul className={styles.dropdownList}>
      {movieList.map((m) => (
        <li
          key={m.id}
          onClick={() => {
            handleSearch(m.title);
          }}
          role="option"
          tabIndex={-1}
        >
          <div className={styles.rowInner}>
            <Icon icon={faMagnifyingGlass} />
            <span>{m.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
