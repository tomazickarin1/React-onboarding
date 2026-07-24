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
};

export default function SearchBar({
  placeholder = searchBarLabels.placeholder,
  ariaLabel = searchBarLabels.ariaLabel,
  query,
  onSubmit,
  onQueryChange,
  topTenMovies,
  searchResults,
}: SearchBarProps) {
  const [trendingOpen, setTrendingOpen] = useState(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  const handleClick = () => {
    // on click only trending should ever open
    setTrendingOpen(true);

    if (query !== "") {
      setTrendingOpen(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTrendingOpen(value === "");
    onQueryChange(e.target.value);
    setSearchResultsOpen(true);
  };

  const navigate = useNavigate();

  const handleSearchTitle = (movTitle: string) => {
    const url = new URL("/search/movie", window.location.origin);
    url.searchParams.set("query", movTitle);
    void navigate(`${url.pathname}${url.search}`);
    setTrendingOpen(false);
    setSearchResultsOpen(false);
    onQueryChange(movTitle);
  };

  const isClickedOutside = useClickOutside(containerRef);

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

      {trendingOpen && !isClickedOutside && (
        <div className={styles.trendingMovies}>
          <div className={styles.trendingHeader}>
            <div className={styles.trendingHeaderInner}>
              <Icon icon={faArrowTrendUp} />
              <span>Trending</span>
            </div>
          </div>
          <SearchResults
            movieList={topTenMovies}
            handleSearch={handleSearchTitle}
          />
        </div>
      )}

      {searchResultsOpen && !isClickedOutside && (
        <SearchResults
          movieList={searchResults}
          handleSearch={handleSearchTitle}
        />
      )}
    </div>
  );
}
