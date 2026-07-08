import { createContext, useState } from "react";
import { DEFAULT_SORT } from "../data/sortingOptions";
import type { Dispatch, SetStateAction, ReactNode } from "react";

type Movie = { id: number; url: string; title: string; date: string };

const defaultValue = {
  movies: [] as Movie[],
  selectedGenres: [] as number[],
  sortBy: DEFAULT_SORT,
  setSelectedGenres: (() => {}) as Dispatch<
    SetStateAction<number[]>
  >,
  setSortBy: (() => {}) as Dispatch<
    SetStateAction<{ value: string; label: string }>
  >,
  setMovies: (() => {}) as Dispatch<SetStateAction<Movie[]>>,
};

export const PopularMoviesContext = createContext(defaultValue);

export function PopularMoviesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <PopularMoviesContext.Provider
      value={{
        selectedGenres,
        setSelectedGenres,
        sortBy,
        setSortBy,
        movies,
        setMovies,
      }}
    >
      {children}
    </PopularMoviesContext.Provider>
  );
}
