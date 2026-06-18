import styles from "./SearchResults.module.scss";
import MovieCard from "../../atoms/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { useState } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../../utils/formatDate";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

interface TmdbMovie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  overview: string;
}

interface TmdbResponse {
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

async function fetchSearchMovies(page: number, filter: string, query: string): Promise<SearchResult> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/search/${filter}?api_key=${apiKey}&query=${query}&page=${String(page)}`
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }
  const data = (await response.json()) as TmdbResponse;

  console.log(data);

  const searchData = {
    movies: data.results.map((movie) => ({
      id: movie.id,
      title: movie.title ?? movie.name ?? "",
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date ?? movie.first_air_date ?? "",
      description: movie.overview
    })),
    totalPages: data.total_pages,
  }

  return searchData
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
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!data) {
    return <p>No results found.</p>;
  }

  // calculate start page
  const startPage = Math.max(1, Math.min(page - 2, data.totalPages - 4));
  // calculate which 5 pages are showing
  const pageNumbers = Array.from({ length: Math.min(5, data.totalPages) }).map((e, i) => startPage + i);

  return (
    <div className={styles.movieCards}>
      {(data.movies).map((movie) => (
        <MovieCard
          key={movie.id}
          imageUrl={movie.url}
          title={movie.title}
          date={movie.date ? formatDate(movie.date) : ""}
          content={movie.description}
          isLoading={isLoading}
        />
      ))}
      <nav className={styles.pageNumbers}>
        <button onClick={() => { setPage(p => p - 1); }} disabled={page === 1}><FontAwesomeIcon icon={faChevronLeft} /></button>
        {pageNumbers.map((pageNum) => (
          <button key={pageNum} onClick={() => { setPage(pageNum); }} data-active={page == pageNum}> {pageNum}
          </button>
        ))}
        <button onClick={() => { setPage(p => p + 1); }} disabled={page === data.totalPages}><FontAwesomeIcon icon={faChevronRight} /></button>
      </nav>
    </div>
  );
}
