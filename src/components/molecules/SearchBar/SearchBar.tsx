import styles from "./SearchBar.module.scss";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { searchBarLabels } from "../../../data/labels";

type SearchBarProps = {
  placeholder?: string;
  ariaLabel?: string;
};

export default function SearchBar({
  placeholder = searchBarLabels.placeholder,
  ariaLabel = searchBarLabels.ariaLabel,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    void navigate(`/search?query=${query}`);
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
            setQuery(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
