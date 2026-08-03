import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_SORT } from "../data/sortingOptions";

type Movie = { id: number; url: string; title: string; date: string };
type SortOptions = { value: string; label: string };

type PopularMoviesState = {
  movies: Movie[];
  selectedGenres: number[];
  sortBy: SortOptions;
};

const initialState: PopularMoviesState = {
  movies: [],
  selectedGenres: [],
  sortBy: DEFAULT_SORT,
};

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setSelectedGenres: (state, action: PayloadAction<number[]>) => {
      state.selectedGenres = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOptions>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setMovies, setSelectedGenres, setSortBy } =
  popularMoviesSlice.actions;
export default popularMoviesSlice;
