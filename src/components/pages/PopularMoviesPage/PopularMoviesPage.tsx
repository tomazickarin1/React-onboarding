import styles from "./PopularMoviesPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import Card from "../../atoms/Card/Card";
import { useQuery } from "@tanstack/react-query";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

interface Tmdbmovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}
type Movie = { id: number; url: string; title: string; date: string };

async function fetchPopularMovies(): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(`${tmbUrl}/movie/popular?api_key=${apiKey}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = (await response.json()) as { results: Tmdbmovie[] };
  // console.log(data);

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
    date: movie.release_date,
  }));
}

// fetchPopularMovies();

export default function PopularMovies() {
  const { data } = useQuery({
    queryKey: ["popular-movies-page"],
    queryFn: fetchPopularMovies,
  });

  console.log(data);

  return (
    <SingleColumn>
      <div>
        <div>
          <h2>Popular Movies</h2>
          <div className={styles.filterWrapper}>sort</div>
        </div>
        <div>
          {data?.map((r) => {
            return (
              <Card key={r.id} image={r.url} title={r.title} date={r.date} />
            );
          })}
        </div>
      </div>
    </SingleColumn>
  );
}
