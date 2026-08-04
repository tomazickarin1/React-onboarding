import { useState, useEffect } from "react";
import styles from "./PopularMoviesPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import Card from "../../molecules/Card/Card";
import { useQuery } from "@tanstack/react-query";
import SortDropdown from "../../molecules/SortDropdown/SortDropdown";
import FilterPanel from "../../molecules/FilterPanel/FilterPanel";
import GenreFilter from "../../molecules/GenreFilter/GenreFilter";
import { DEFAULT_SORT } from "../../../data/sortingOptions";
import { sortDropdownLabels, cardLabels } from "../../../data/labels";
import { UseDocumentTitle } from "../../../hooks/useDocumentTitle";
import { fetchPopularMovies } from "../../../utils/fetchPopularMovies";
import { fetchGenres } from "../../../utils/fetchGenres";
// import { PopularMoviesContext } from "../../../store/PopularMoviesContext";
// import { useDispatch, useSelector } from "react-redux";
// import type { Dispatch, SetStateAction } from "react";
// import type { RootState } from "../../../store/store";

import { usePopularMovies } from "../../../hooks/usePopularMovies";

// import {
//   setMovies,
//   setSelectedGenres,
//   setSortBy,
// } from "../../../store/popularMoviesSlice";

type PopularMoviesPageProps = {
  heading: string;
  resultsAriaLabel: string;
  searchButtonLabel: string;
};

export default function PopularMovies({
  heading,
  resultsAriaLabel,
  searchButtonLabel,
}: PopularMoviesPageProps) {
  UseDocumentTitle("Popular Movies Page - The Movie Database(TMDB)");

  const [sortToggle, setSortToggle] = useState(false);
  const [genreToggle, setGenreToggle] = useState(false);
  const [appliedGenres, setApliedGenres] = useState<number[]>([]);
  const [appliedSortBy, setAppliedSortBy] = useState(DEFAULT_SORT);

  // const {
  //   sortBy,
  //   setSortBy,
  //   selectedGenres,
  //   setSelectedGenres,
  //   movies,
  //   setMovies,
  // } = useContext(PopularMoviesContext);

  // const dispatch = useDispatch();
  // const { movies, selectedGenres, sortBy } = useSelector(
  //   (state: RootState) => state.popularMovies,
  // );

  const {
    movies,
    setMovies,
    selectedGenres,
    setSelectedGenres,
    sortBy,
    setSortBy,
  } = usePopularMovies();

  const { data: movieData } = useQuery({
    queryKey: ["popular-movies-page", appliedSortBy.value, appliedGenres],
    queryFn: () => fetchPopularMovies(appliedSortBy.value, appliedGenres),
  });

  const { data: genre } = useQuery({
    queryKey: ["genre-list"],
    queryFn: fetchGenres,
  });

  useEffect(() => {
    if (movieData) {
      setMovies(movieData);
      // dispatch(setMovies(movieData));
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

  // const handleSetSelectedGneres: Dispatch<SetStateAction<number[]>> = (
  //   action,
  // ) => {
  //   const value =
  //     typeof action === "function" ? action(selectedGenres) : action;
  //   dispatch(setSelectedGenres(value));
  // };

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
              <SortDropdown
                sortBy={sortBy}
                setSortBy={setSortBy}
                // setSortBy={(option) => dispatch(setSortBy(option))}
                ariaLabel={sortDropdownLabels.ariaLabel}
              />
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
                // setSelectedGenres={handleSetSelectedGneres}
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
                  optionsPromptLabel={cardLabels.optionsPrompt}
                  loginLabel={cardLabels.login}
                  notAMemberLabel={cardLabels.notAMember}
                  signUpLabel={cardLabels.signUp}
                />
              );
            })}
          </div>
        </div>
      </div>
    </SingleColumn>
  );
}
