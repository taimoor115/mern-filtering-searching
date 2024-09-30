import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./features/movies/movies.slice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});
