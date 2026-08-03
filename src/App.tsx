import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./components/pages/HomePage/HomePage";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import SearchResults from "./components/pages/SearchResults/SearchResults";
import MovieDetailPage from "./components/pages/MovieDetailPage/MovieDetailPage";
import PopularMoviesPage from "./components/pages/PopularMoviesPage/PopularMoviesPage";
// import { PopularMoviesProvider } from "./store/PopularMoviesContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { popularMoviesPageLabels, searchResultsLabels } from "./data/labels";
import { Routes, Route, Navigate, useSearchParams } from "react-router";
import NavigationBar from "./components/organisms/NavigationBar/NavigationBar";
import Footer from "./components/organisms/Footer/Footer";

function SearchRedirect() {
  const [searchParams] = useSearchParams();
  return (
    <Navigate
      to={{ pathname: "tv", search: searchParams.toString() }}
      replace
    />
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />}>
          <Route index element={<SearchRedirect />} />
          <Route
            path=":filter"
            element={
              <SearchResults
                errorLabel={searchResultsLabels.error}
                emptyLabel={searchResultsLabels.empty}
              />
            }
          />
        </Route>
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route
          path="/popular"
          element={
            // <PopularMoviesProvider>
            <Provider store={store}>
              <PopularMoviesPage
                heading={popularMoviesPageLabels.heading}
                resultsAriaLabel={popularMoviesPageLabels.resultsAriaLabel}
                searchButtonLabel={popularMoviesPageLabels.searchButton}
              />
            </Provider>
            // </PopularMoviesProvider>
          }
        />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}
