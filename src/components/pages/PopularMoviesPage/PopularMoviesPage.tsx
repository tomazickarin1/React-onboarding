import { useRef, useState } from "react";
import styles from "./PopularMoviesPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import {
  faChevronRight,
  faChevronDown,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../../hooks/useClickOutside";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

const DEFAULT_SORT = {
  value: "popularity.desc",
  label: "Popularity Descending",
};

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

type Genre = { id: number; name: string };

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

async function getGenres(): Promise<Genre[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(`${tmbUrl}/genre/movie/list?api_key=${apiKey}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = (await response.json()) as { genres: Genre[] };

  return data.genres;
}

export default function PopularMovies() {
  const { data: movies } = useQuery({
    queryKey: ["popular-movies-page"],
    queryFn: fetchPopularMovies,
  });

  const { data: genre } = useQuery({
    queryKey: ["genre-list"],
    queryFn: getGenres,
  });

  console.log(genre);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const sortRef = useRef<HTMLDivElement>(null);
  const isClickedOutsideSort = useClickOutside(sortRef);

  const handleSortOpen = () => {
    const isCurrentlyOpen = isSortOpen && !isClickedOutsideSort;
    setIsSortOpen(!isCurrentlyOpen);
  };

  const [sortToggle, setSortToggle] = useState(false);

  const handleSortToggle = () => {
    console.log("toggle");
    setSortToggle(!sortToggle);
  };

  return (
    <SingleColumn>
      <div className={styles.container}>
        <h2>Popular Movies</h2>
        <div className={styles.popularWrapper}>
          <div>
            <div className={styles.filterWrapper}>
              <div className={styles.filterPanel}>
                <div className={styles.sortName} onClick={handleSortToggle}>
                  <h3>Sort</h3>

                  {sortToggle ? (
                    <Icon
                      icon={faChevronDown}
                      className={styles.chevron ?? ""}
                    />
                  ) : (
                    <Icon
                      icon={faChevronRight}
                      className={styles.chevron ?? ""}
                    />
                  )}
                </div>

                {sortToggle && (
                  <div className={styles.sortFilter}>
                    <h3>Sort Results By</h3>
                    <div className={styles.sortWrapper} ref={sortRef}>
                      <button
                        type="button"
                        onClick={handleSortOpen}
                        className={styles.sortBtn}
                        aria-expanded={isSortOpen}
                        aria-haspopup="listbox"
                      >
                        {sortBy.label}
                        <Icon
                          icon={faCaretDown}
                          className={styles.caret ?? ""}
                        />
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
                )}
              </div>
              <div className={styles.filterPanel}>
                <div className={styles.genresName}>
                  <h3>Filters</h3>
                  <Icon icon={faChevronDown} className={styles.chevron ?? ""} />
                </div>
                <div className={styles.genresFilter}>
                  <p>Genres</p>
                  <ul></ul>
                  {genre?.map((g) => {
                    return <li key={g.id}>{g.name}</li>;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.moviesGrid}>
            {movies?.map((r) => {
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
      </div>
    </SingleColumn>
  );
}
