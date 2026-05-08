import styles from "./SearchPage.module.scss";
import MovieCard from "../../atoms/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    `${tmbUrl}/search/movie?api_key=${apiKey}&query=The&page=${String(page)}`
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }
  const data = (await response.json()) as TmdbResponse;

  console.log(data);

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

export default function SearchPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-movies", page],
    queryFn: () => fetchSearchMovies(page),
  });

  if (error) {
    return (
      <p>{error instanceof Error ? error.message : "Something went wrong"}</p>
    );
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.searchWrapper}>
        <div className={styles.searchFilters}>
          <div className={styles.searchHeader}>
            <h3>Search Results</h3>
          </div>
          <div>
            <ul>
              <li>
                <a href="">TV Show</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Movies</a>
                <span>3</span>
              </li>
              <li>
                <a href="">People</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Collections</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Companies</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Keywords</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Networks</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Awards</a>
                <span>3</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
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
        </div>

        <button onClick={() => { setPage(p => p - 1); }} disabled={page === 1}>Previous</button>
        <button onClick={() => { setPage(p => p + 1); }} disabled={page === data.totalPages}>Next</button>

      </div>
    </>
  );
}
