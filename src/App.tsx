import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./App.module.scss";
import HomePage from "./components/pages/HomePage/HomePage";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import SearchResults from "./components/pages/SearchResults/SearchResults";
import MovieDetailPage from "./components/pages/MovieDetailPage/MovieDetailPage";
import PopularMoviesPage from "./components/pages/PopularMoviesPage/PopularMoviesPage";

import { Routes, Route, Navigate, useSearchParams  } from "react-router";

function SearchRedirect() {
  const [searchParams] = useSearchParams();
  return <Navigate to={{ pathname: "tv", search: searchParams.toString() }} replace />;
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.movieapp}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} >
            <Route index element={<SearchRedirect />} />
            <Route path=":filter" element={<SearchResults />} />
          </Route>
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/popular" element={<PopularMoviesPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}
