import styles from "./NavigationBar.module.scss";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import MobileNav from "../MobileNav/MobileNav";
import DesktopNav from "../DesktopNav/DesktopNav";
import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useLocation } from "react-router";
import { useDebounce } from "../../../hooks/useDebounce";

const tmdbUrl = "https://api.themoviedb.org/3";

const tmdbMovieSchema = z.object({
  title: z.string(),
  id: z.number(),
});

const movieListSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

async function fetchTrending() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmdbUrl}/trending/movie/day?api_key=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = movieListSchema.parse(json);
  const top10 = data.results.slice(0, 10);

  return top10;
}

async function fetchSearch(query: string) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const response = await fetch(
    `${tmdbUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = movieListSchema.parse(json);

  return data.results.slice(0, 10);
}

export default function NavigationBar() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);

    if (location.pathname.startsWith("/search")) {
      setQuery(searchParams.get("query") ?? "");
    } else {
      setQuery("");
    }
  }

  const navigate = useNavigate();

  const debounceQuery = useDebounce(query, 400);

  const trendingQuery = useQuery({
    queryKey: ["trending-results"],
    queryFn: () => fetchTrending(),
  });

  const searchQuery = useQuery({
    queryKey: ["search-results", debounceQuery],
    queryFn: () => fetchSearch(debounceQuery),
    enabled: debounceQuery !== "", // skip the search when input is empty
  });

  const movieTitles = trendingQuery.data;
  const searchResults = searchQuery.data;

  function handleSearchSubmit() {
    const url = new URL("/search", window.location.origin);
    url.searchParams.set("query", query);
    void navigate(`${url.pathname}${url.search}`);
  }

  return (
    <>
      <div className={styles.navbarWrapper}>
        <DesktopNav />
        <MobileNav />
      </div>
      <SearchBar
        query={query}
        topTenMovies={movieTitles ?? []}
        searchResults={searchResults ?? []}
        onQueryChange={setQuery}
        onSubmit={handleSearchSubmit}
        isSearching={searchQuery.isFetching || query !== debounceQuery}
      />
    </>
  );
}
