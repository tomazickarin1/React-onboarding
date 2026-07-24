import styles from "./SearchBar.module.scss";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import {
  faMagnifyingGlass,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import type { SubmitEvent, ChangeEvent } from "react";
import { searchBarLabels } from "../../../data/labels";
import { useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useNavigate } from "react-router";
import SearchResults from "../SearchResults/SearchResults";

type SearchBarProps = {
  query: string;
  placeholder?: string;
  ariaLabel?: string;
  onSubmit: () => void;
  topTenMovies: Array<{ title: string; id: number }>;
  onQueryChange: (value: string) => void;
  searchResults: Array<{ title: string; id: number }>;
  isSearching: boolean;
};

export default function SearchBar({
  placeholder = searchBarLabels.placeholder,
  ariaLabel = searchBarLabels.ariaLabel,
  query,
  onSubmit,
  onQueryChange,
  topTenMovies,
  searchResults,
  isSearching,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    onQueryChange(e.target.value);
  };

  const navigate = useNavigate();

  const handleSearchTitle = (movTitle: string) => {
    const url = new URL("/search/movie", window.location.origin);
    url.searchParams.set("query", movTitle);
    void navigate(`${url.pathname}${url.search}`);
    setIsOpen(false);
    onQueryChange(movTitle);
  };

  const isClickedOutside = useClickOutside(containerRef);

  const noResults = !isSearching && searchResults.length === 0 && query !== "";

  return (
    <div className={styles.searchBarWrapper} ref={containerRef}>
      <form className={styles.searchBar} role="search" onSubmit={handleSubmit}>
        <Icon icon={faMagnifyingGlass} />
        <Input
          type="search"
          ariaLabel={ariaLabel}
          placeholder={placeholder}
          value={query}
          onClick={handleClick}
          onChange={handleChange}
        />
      </form>

      {isOpen && !isClickedOutside && (
        <div className={styles.trendingMovies}>
          {query === "" && (
            <div className={styles.trendingHeader}>
              <div className={styles.trendingHeaderInner}>
                <Icon icon={faArrowTrendUp} />
                <span>Trending</span>
              </div>
            </div>
          )}

          {noResults ? (
            <div className={styles.empty}>
              <p>No results</p>
            </div>
          ) : (
            <SearchResults
              movieList={query === "" ? topTenMovies : searchResults}
              handleSearch={handleSearchTitle}
            />
          )}
        </div>
      )}
    </div>
  );
}
