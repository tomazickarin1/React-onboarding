import { useState, useContext, useEffect } from "react";
import styles from "./PopularMoviesPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import Card from "../../atoms/Card/Card";
import { useQuery } from "@tanstack/react-query";
import SortDropdown from "../../molecules/SortDropdown/SortDropdown";
import FilterPanel from "../../molecules/FilterPanel/FilterPanel";
import GenreFilter from "../../molecules/GenreFilter/GenreFilter";
import { DEFAULT_SORT } from "../../../data/sortingOptions";
import { popularMoviesPageLabels } from "../../../data/labels";

import { PopularMoviesContext } from "../../../store/PopularMoviesContext";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

type Tmdbmovie = {
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

type PopularMoviesPageProps = {
  heading?: string;
  resultsAriaLabel?: string;
  searchButtonLabel?: string;
};

export default function PopularMovies({
  heading = popularMoviesPageLabels.heading,
  resultsAriaLabel = popularMoviesPageLabels.resultsAriaLabel,
  searchButtonLabel = popularMoviesPageLabels.searchButton,
}: PopularMoviesPageProps) {
  const [sortToggle, setSortToggle] = useState(false);
  const [genreToggle, setGenreToggle] = useState(false);
  const [appliedGenres, setApliedGenres] = useState<number[]>([]);
  const [appliedSortBy, setAppliedSortBy] = useState(DEFAULT_SORT);

  const {
    sortBy,
    setSortBy,
    selectedGenres,
    setSelectedGenres,
    movies,
    setMovies,
  } = useContext(PopularMoviesContext);

  const { data: movieData } = useQuery({
    queryKey: ["popular-movies-page", appliedSortBy.value, appliedGenres],
    queryFn: () => fetchPopularMovies(appliedSortBy.value, appliedGenres),
  });

  const { data: genre } = useQuery({
    queryKey: ["genre-list"],
    queryFn: getGenres,
  });

  useEffect(() => {
    if (movieData) {
      setMovies(movieData);
    }
  }, [movieData, setMovies]);

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
        <h2>{heading}</h2>
        <div className={styles.popularWrapper}>
          <div className={styles.filterWrapper}>
            <FilterPanel
              title={"Sort"}
              subtitle={"Sort Results By"}
              toggleAction={handleSortToggle}
              toggle={sortToggle}
            >
              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </FilterPanel>
            <FilterPanel
              title={"Filters"}
              subtitle={"Genres"}
              toggleAction={handleGenreToggle}
              toggle={genreToggle}
            >
              <GenreFilter
                genre={genre}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
              />
            </FilterPanel>
            <button
              onClick={applyFilters}
              disabled={!hasChanges}
              className={styles.submitBtn}
            >
              {searchButtonLabel}
            </button>
          </div>
          <div
            className={styles.moviesGrid}
            aria-live="polite"
            aria-label={resultsAriaLabel}
          >
            {movies.map((r) => {
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
