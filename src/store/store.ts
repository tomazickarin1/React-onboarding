import { configureStore } from "@reduxjs/toolkit";
import popularMoviesSlice from "./popularMoviesSlice";

export const store = configureStore({
  reducer: {
    popularMovies: popularMoviesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
