import styles from "./SearchResults.module.scss";
import MovieCard from "../../atoms/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useParams } from "react-router";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
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

async function fetchSearchMovies(page: number): Promise<SearchResult> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/search/movie?api_key=${apiKey}&query=twilight&page=${String(page)}`
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }
  const data = (await response.json()) as TmdbResponse;

  const searchData = {
    movies: data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date,
      description: movie.overview,
      totalPages: data.total_pages
    })),
    totalPages: data.total_pages,
  }

  return searchData
}

export default function SearchResults() {
  const [page, setPage] = useState(1);


  // const { filter } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-movies", page],
    queryFn: () => fetchSearchMovies(page),
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
  const pageNumbers = Array.from({ length: 5 }).map((e, i) => startPage + i);

  return (
    <div className={styles.movieCards}>
      {(data.movies).map((movie) => (
        <MovieCard
          key={movie.id}
          imageUrl={movie.url}
          title={movie.title}
          date={movie.date}
          content={movie.description}
          isLoading={isLoading}
        />
      ))}
      <nav className={styles.pageNumbers}>
        <a onClick={() => { setPage(p => p - 1); }} data-disabled={page === 1}><FontAwesomeIcon icon={faChevronLeft} /></a>
        {pageNumbers.map((pageNum) => (
          <a key={pageNum} onClick={() => { setPage(pageNum); }} data-active={page == pageNum}> {pageNum}
          </a>
        ))}
        <a onClick={() => { setPage(p => p + 1); }} data-disabled={page === data.totalPages}><FontAwesomeIcon icon={faChevronRight} /></a>
      </nav>
    </div>
  );
}
