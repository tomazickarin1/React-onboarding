import styles from "./SearchBar.module.scss";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
    <div className={styles.searchBarWrapper}>
      <form className={styles.searchBar} role="search">
        <Icon icon={faMagnifyingGlass} />
        <Input
          type="search"
          ariaLabel="Search for a movie, tv show, person"
          placeholder="Search for a movie, tv show, person..."
        />
      </form>
    </div>
  );
}
