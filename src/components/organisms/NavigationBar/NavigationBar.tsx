import styles from "./NavigationBar.module.scss";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import MobileNav from "../MobileNav/MobileNav";
import DesktopNav from "../DesktopNav/DesktopNav";
import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

const tmbUrl = "https://api.themoviedb.org/3";

const tmdbMovieSchema = z.object({
  title: z.string(),
  id: z.number(),
});

const trendingSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

async function fetchTrending() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/trending/movie/day?api_key=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = trendingSchema.parse(json);

  const top10 = data.results.slice(0, 10);

  return top10;
}

export default function NavigationBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const trendingQuery = useQuery({
    queryKey: ["trending-results"],
    queryFn: () => fetchTrending(),
  });

  const movieTitles = trendingQuery.data;

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
        onQueryChange={setQuery}
        onSubmit={handleSearchSubmit}
      />
    </>
  );
}
