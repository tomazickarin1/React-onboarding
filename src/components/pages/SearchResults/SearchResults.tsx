import styles from "./SearchResults.module.scss";
import MovieCard from "../../atoms/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import Pagination from "../../molecules/Pagination/Pagination";
import Spinner from "../../atoms/Spinner/Spinner";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

type TmdbMovie = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  overview: string;
}

type TmdbResponse = {
  results: TmdbMovie[];
  total_pages: number;
}

type Movie = {
  id: number;
  url: string;
  title: string;
  date: string;
  description: string;
};

type SearchResult = { movies: Movie[]; totalPages: number };

async function fetchSearchMovies(
  page: number,
  filter: string,
  query: string,
): Promise<SearchResult> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/search/${filter}?api_key=${apiKey}&query=${query}&page=${String(page)}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }
  const data = (await response.json()) as TmdbResponse;

  const searchData = {
    movies: data.results.map((movie) => ({
      id: movie.id,
      title: movie.title ?? movie.name ?? "",
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date ?? movie.first_air_date ?? "",
      description: movie.overview,
    })),
    totalPages: data.total_pages,
  };

  return searchData;
}

export default function SearchResults() {
  const [page, setPage] = useState(1);
  const { filter } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-movies", page, filter, query],
    queryFn: () => fetchSearchMovies(page, filter ?? "tv", query),
  });

  if (error) {
    return (
      <p>{error instanceof Error ? error.message : "Something went wrong"}</p>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>No results found.</p>;
  }

  return (
    <div className={styles.movieCards}>
      {data.movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={String(movie.id)}
          imageUrl={movie.url}
          title={movie.title}
          date={movie.date ? formatDate(movie.date) : ""}
          content={movie.description}
          isLoading={isLoading}
        />
      ))}

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
