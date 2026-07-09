import styles from "./SearchBar.module.scss";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import type { SubmitEvent } from "react";
import { searchBarLabels } from "../../../data/labels";

type SearchBarProps = {
  query: string;
  placeholder?: string;
  ariaLabel?: string;
  onSubmit: () => void;
  onQueryChange: (value: string) => void;
};

export default function SearchBar({
  placeholder = searchBarLabels.placeholder,
  ariaLabel = searchBarLabels.ariaLabel,
  query,
  onSubmit,
  onQueryChange
}: SearchBarProps) {

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className={styles.searchBarWrapper}>
      <form className={styles.searchBar} role="search" onSubmit={handleSubmit}>
        <Icon icon={faMagnifyingGlass} />
        <Input
          type="search"
          ariaLabel={ariaLabel}
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
