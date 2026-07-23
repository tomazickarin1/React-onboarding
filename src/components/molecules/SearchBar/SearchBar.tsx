import styles from "./SearchBar.module.scss";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import {
  faMagnifyingGlass,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import type { SubmitEvent } from "react";
import { searchBarLabels } from "../../../data/labels";
import { useState, useRef } from "react";
import { Link } from "react-router";
import { useClickOutside } from "../../../hooks/useClickOutside";

type SearchBarProps = {
  query: string;
  placeholder?: string;
  ariaLabel?: string;
  onSubmit: () => void;
  topTenMovies: Array<{ title: string; id: number }>;
  onQueryChange: (value: string) => void;
};

export default function SearchBar({
  placeholder = searchBarLabels.placeholder,
  ariaLabel = searchBarLabels.ariaLabel,
  query,
  onSubmit,
  onQueryChange,
  topTenMovies,
}: SearchBarProps) {
  const [trendingOpen, setTrendingOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  const handleClick = () => {
    setTrendingOpen(true);
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
          onChange={(e) => {
            const value = e.target.value;
            setTrendingOpen(value === "");
            onQueryChange(e.target.value);
          }}
        />
      </form>

      {trendingOpen && !isClickedOutside && (
        <div className={styles.trendingMovies}>
          <div className={styles.trendingHeader}>
            <Icon icon={faArrowTrendUp} />
            <span>Trending</span>
          </div>
          <ul className={styles.trendingList}>
            {topTenMovies.map((m) => (
              <li key={m.id}>
                <Link
                  to={`/movie/${m.id.toString()}-${m.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon icon={faMagnifyingGlass} />
                  <span>{m.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
