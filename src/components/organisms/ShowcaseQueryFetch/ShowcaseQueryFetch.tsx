import { useQuery } from "@tanstack/react-query";
import Showcase from "../Showcase/Showcase";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

interface TmdbResponse {
  results: TmdbMovie[];
}

type Movie = { id: number; url: string; title: string; date: string };

async function fetchPopularMovies(): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/movie/popular?api_key=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${String(response.status)}`,
    );
  }

  const data = (await response.json()) as TmdbResponse;

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path
      ? `${tmbImageUrl}${movie.poster_path}`
      : "",
    date: movie.release_date,
  }));
}

export default function ShowcaseQueryFetch() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: fetchPopularMovies,
  });

  if (error) {
    return (
      <p>{error instanceof Error ? error.message : "Something went wrong"}</p>
    );
  }

  return <Showcase movies={data ?? []} isLoading={isLoading} />;
}
