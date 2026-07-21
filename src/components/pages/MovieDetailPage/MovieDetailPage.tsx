import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import styles from "./MovieDetailPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import UserScore from "../../molecules/UserScore/UserScore";
import MovieActions from "../../molecules/MovieActions/MovieActions";
import MovieInfo from "../../molecules/MovieInfo/MovieInfo";
import CrewGrid from "../../molecules/CrewGrid/CrewGrid";
import { z } from "zod";
import { UseDocumentTitle } from "../../../hooks/useDocumentTitle";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";
const tmbBackdropUrl = "https://image.tmdb.org/t/p/w1280";

const movieSchema = z.object({
  id: z.number(),
  overview: z.string(),
  title: z.string(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  release_date: z.string(),
  poster_path: z.string(),
  backdrop_path: z.string(),
  tagline: z.string(),
  runtime: z.number(),
  credits: z.object({
    crew: z.array(
      z.object({ id: z.number(), name: z.string(), job: z.string() }),
    ),
  }),
  vote_average: z.number(),
});

async function fetchMovieDetails(id: string) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/movie/${id}?api_key=${apiKey}&append_to_response=credits,release_dates`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = movieSchema.parse(json);

  return data;
}

export default function MovieDetailPage() {
  const movieId = useParams();
  const movieDetailQuery = useQuery({
    queryKey: ["movie-detail", movieId.id],
    queryFn: () => fetchMovieDetails(movieId.id ? movieId.id : ""),
  });

  const movieDetails = movieDetailQuery.data;

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

  UseDocumentTitle(
    `${movieDetails?.title ?? ""} (${releaseYear !== null ? String(releaseYear) : ""})- The Movie Database(TMDB)`,
  );

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
                {movieDetails?.title} <span>({releaseYear})</span>
              </h2>

              <div className={styles.facts}>
                <span>{releaseDate}</span>
                <span>
                  {movieDetails?.genres.map((g) => g.name).join(", ")}
                </span>
                <span>
                  {Math.floor((movieDetails?.runtime ?? 0) / 60)}h
                  {(movieDetails?.runtime ?? 0) % 60}m
                </span>
              </div>
              <UserScore score={movieDetails?.vote_average ?? 0} />
              <MovieActions />
              <MovieInfo
                tagline={movieDetails?.tagline ?? ""}
                overview={movieDetails?.overview ?? ""}
              />
              <CrewGrid crewDetails={movieDetails?.credits.crew ?? []} />
            </div>
          </div>
        </div>
      </div>
    </SingleColumn>
  );
}
