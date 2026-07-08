import styles from "./SearchBar.module.scss";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    void navigate(`/search?query=${query}`);
  }

  return (
    <div className={styles.searchBarWrapper}>
      <form className={styles.searchBar} role="search" onSubmit={handleSubmit}>
        <Icon icon={faMagnifyingGlass} />
        <Input
          type="search"
          ariaLabel="Search for a movie, tv show, person"
          placeholder="Search for a movie, tv show, person..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
