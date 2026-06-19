import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import styles from "./MovieDetailPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";
const tmbBackdropUrl = "https://image.tmdb.org/t/p/w1280";

interface MovieDetails {
  id: string;
  overview: string;
  title: string;
  genres: Array<{ id: number; name: string }>;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  runtime: number;
  credits: {
    crew: Array<{ name: string; job: string }>;
  };
  vote_average: number;
}

async function fetchMovieDetails(id: string) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/movie/${id}?api_key=${apiKey}&append_to_response=credits,release_dates`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = (await response.json()) as MovieDetails;

  return data;
}

export default function MovieDetailPage() {
  const movieId = useParams();
  const movieDetailQuery = useQuery({
    queryKey: ["movie-detail", movieId.id],
    queryFn: () => fetchMovieDetails(movieId.id ? movieId.id : ""),
  });

  const movieDetails = movieDetailQuery.data;
  console.log(movieDetails);

  const releaseYear = movieDetails?.release_date
    ? new Date(movieDetails.release_date).getFullYear()
    : null;

  const releaseDate = movieDetails?.release_date
    ? new Date(movieDetails.release_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <SingleColumn>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: movieDetails?.backdrop_path
            ? `url(${tmbBackdropUrl}${movieDetails.backdrop_path})`
            : "none",
        }}
      >
        <div className={styles.backdropBackground}>
          <div className={styles.innerWrapper}>
            <div>
              {movieDetails?.poster_path && (
                <img src={`${tmbImageUrl}${movieDetails.poster_path}`} alt="" />
              )}
            </div>
            <div>
              <h2>
                {movieDetails?.title} ({releaseYear})
              </h2>

              <div className={styles.facts}>
                <span>{releaseDate}</span>
                <span>
                  {movieDetails?.genres.map((g) => g.name).join(", ")}
                </span>
                <span>
                  {Math.floor((movieDetails?.runtime ?? 0) / 60)}h{" "}
                  {(movieDetails?.runtime ?? 0) % 60}m
                </span>
              </div>

              <div>
                <p>{movieDetails?.tagline}</p>
                <h3>Overview</h3>
                <p>{movieDetails?.overview}</p>
              </div>

              <div>
                <div>{movieDetails?.credits.crew.map((c) => c.name)}</div>
                <div>{movieDetails?.credits.crew.map((c) => c.job)}</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleColumn>
  );
}
