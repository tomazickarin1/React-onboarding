import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import * as actions from "../store/popularMoviesSlice";
import type { Dispatch, SetStateAction } from "react";

type Movie = { id: number; url: string; title: string; date: string };
type SortOption = { value: string; label: string };

export function usePopularMovies() {
  const dispatch = useDispatch();
  const { movies, selectedGenres, sortBy } = useSelector(
    (state: RootState) => state.popularMovies,
  );

  const setMovies: Dispatch<SetStateAction<Movie[]>> = (action) => {
    const value = typeof action === "function" ? action(movies) : action;
    dispatch(actions.setMovies(value));
  };

  const setSelectedGenres: Dispatch<SetStateAction<number[]>> = (action) => {
    const value =
      typeof action === "function" ? action(selectedGenres) : action;
    dispatch(actions.setSelectedGenres(value));
  };

  const setSortBy: Dispatch<SetStateAction<SortOption>> = (action) => {
    const value = typeof action === "function" ? action(sortBy) : action;
    dispatch(actions.setSortBy(value));
  };

  return {
    movies,
    setMovies,
    selectedGenres,
    setSelectedGenres,
    sortBy,
    setSortBy,
  };
}
