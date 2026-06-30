import { useRef, useState } from "react";
import styles from "./PopularMoviesPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import {
  faChevronRight,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../../hooks/useClickOutside";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

const DEFAULT_SORT = { value: "popularity.desc", label: "Popularity Descending" };

const sortOptions = [
  DEFAULT_SORT,
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
];

interface Tmdbmovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}
type Movie = { id: number; url: string; title: string; date: string };

async function fetchPopularMovies(): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(`${tmbUrl}/movie/popular?api_key=${apiKey}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = (await response.json()) as { results: Tmdbmovie[] };
  // console.log(data);

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
    date: movie.release_date,
  }));
}

// fetchPopularMovies();

export default function PopularMovies() {
  const { data } = useQuery({
    queryKey: ["popular-movies-page"],
    queryFn: fetchPopularMovies,
  });

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const sortRef = useRef<HTMLDivElement>(null);
  const isClickedOutsideSort = useClickOutside(sortRef);

  const handleSortToggle = () => {
    const isCurrentlyOpen = isSortOpen && !isClickedOutsideSort;
    setIsSortOpen(!isCurrentlyOpen);
  };

  return (
    <SingleColumn>
      <div className={styles.popularWrapper}>
        <div>
          <h2>Popular Movies</h2>
          <div className={styles.filterWrapper}>
            <div className={styles.filterPanel}>
              <div className={styles.name}>
                <h2>Sort</h2>
                <Icon icon={faChevronRight} className={styles.chevron ?? ""} />
              </div>
              <div className={styles.filter}>
                <h3>Sort Results By</h3>
                <div className={styles.sortWrapper} ref={sortRef}>
                  <button
                    type="button"
                    onClick={handleSortToggle}
                    className={styles.sortBtn}
                    aria-expanded={isSortOpen}
                    aria-haspopup="listbox"
                  >
                    {sortBy.label}
                    <Icon icon={faCaretDown} className={styles.caret ?? ""} />
                  </button>

                  {isSortOpen && !isClickedOutsideSort && (
                    <ul className={styles.sortList} role="listbox">
                      {sortOptions.map((option) => (
                        <li
                          key={option.value}
                          role="option"
                          tabIndex={0}
                          aria-selected={option.value === sortBy.value}
                          className={
                            option.value === sortBy.value
                              ? styles.active
                              : ""
                          }
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div>
              <p>filters</p>
            </div>
          </div>
        </div>
        <div className={styles.moviesGrid}>
          {data?.map((r) => {
            return (
              <Card
                key={r.id}
                image={r.url}
                title={r.title}
                date={r.date}
                variant="popular"
              />
            );
          })}
        </div>
      </div>
    </SingleColumn>
  );
}
