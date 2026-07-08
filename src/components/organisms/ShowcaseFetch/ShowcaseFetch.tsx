import { useEffect, useState } from "react";
import Showcase from "../Showcase/Showcase";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

type TmdbMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

type TmdbResponse = {
  results: TmdbMovie[];
}

type Movie = { id: number; title: string; url: string; date: string };

function transformMovies(results: TmdbMovie[]): Movie[] {
  return results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
    date: movie.release_date,
  }));
}

export default function ShowcaseFetch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    fetch(`${tmbUrl}/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Request failed with status ${String(response.status)}`,
          );
        }
        return response.json() as Promise<TmdbResponse>;
      })
      .then((data) => {
        setMovies(transformMovies(data.results));
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return <Showcase movies={movies} isLoading={isLoading} />;
}
