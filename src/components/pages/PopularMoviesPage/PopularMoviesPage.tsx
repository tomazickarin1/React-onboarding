import { useRef, useState } from "react";
import styles from "./PopularMoviesPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import {
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../../hooks/useClickOutside";

import FilterPanel from "../../molecules/FilterPanel/FilterPanel";

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

async function fetchPopularMovies(
  sortBy: string,
  genreId: number[],
): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const genreParam =
    genreId.length > 0 ? `&with_genres=${genreId.join(",")}` : "";

  const response = await fetch(
    `${tmbUrl}/discover/movie?api_key=${apiKey}&sort_by=${sortBy}${genreParam}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = (await response.json()) as { results: Tmdbmovie[] };

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
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortToggle, setSortToggle] = useState(false);
  const [genreToggle, setGenreToggle] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const sortRef = useRef<HTMLDivElement>(null);
  const isClickedOutsideSort = useClickOutside(sortRef);

  const [appliedGenres, setApliedGenres] = useState<number[]>([]);
  const [appliedSortBy, setAppliedSortBy] = useState(DEFAULT_SORT);

  const { data: movies } = useQuery({
    queryKey: ["popular-movies-page", appliedSortBy.value, appliedGenres],
    queryFn: () => fetchPopularMovies(appliedSortBy.value, appliedGenres),
  });

  const { data: genre } = useQuery({
    queryKey: ["genre-list"],
    queryFn: getGenres,
  });

  const handleSortOpen = () => {
    const isCurrentlyOpen = isSortOpen && !isClickedOutsideSort;
    setIsSortOpen(!isCurrentlyOpen);
  };

  const handleSortToggle = () => {
    setSortToggle(!sortToggle);
  };

  const handleGenreToggle = () => {
    setGenreToggle(!genreToggle);
  };

  const applyFilters = () => {
    setApliedGenres(selectedGenres);
    setAppliedSortBy(sortBy);
  };

  const hasChanges =
    sortBy.value !== appliedSortBy.value ||
    JSON.stringify(selectedGenres) !== JSON.stringify(appliedGenres);

  return (
    <SingleColumn>
      <div className={styles.container}>
        <h2>Popular Movies</h2>
        <div className={styles.popularWrapper}>
            <div className={styles.filterWrapper}>
              <FilterPanel title={"Sort"} subtitle={"Sort Results By"} toggleAction={handleSortToggle} toggle={sortToggle}>
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
                    <ul className={styles.sortList} role="listbox" aria-label="Sort results by">
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
              </FilterPanel>
              <FilterPanel title={"Filters"} subtitle={"Genres"} toggleAction={handleGenreToggle} toggle={genreToggle}>
                <ul className={styles.genreList} aria-label="Filter by genre">
                  {genre?.map((g) => {
                    const isSelected = selectedGenres.includes(g.id);
                    return (
                      <li
                        key={g.id}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => {
                          setSelectedGenres((prev) =>
                            prev.includes(g.id)
                              ? prev.filter((id) => id !== g.id)
                              : [...prev, g.id],
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedGenres((prev) =>
                              prev.includes(g.id)
                                ? prev.filter((id) => id !== g.id)
                                : [...prev, g.id],
                            );
                          }
                        }}
                        className={isSelected ? (styles.active ?? "") : ""}
                      >
                        {g.name}
                      </li>
                    );
                  })}
                </ul>
              </FilterPanel>
              <button
                onClick={applyFilters}
                disabled={!hasChanges}
                className={styles.submitBtn}
              >
                Search
              </button>
          </div>
          <div className={styles.moviesGrid} aria-live="polite" aria-label="Movie results">
            {movies?.map((r) => {
              return (
                <Card
                  key={r.id}
                  id={r.id.toString()}
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
