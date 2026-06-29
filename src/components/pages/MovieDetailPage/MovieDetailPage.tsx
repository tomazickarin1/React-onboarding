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
    crew: Array<{ id: number; name: string; job: string }>;
  };
  vote_average: number;
}

async function fetchMovieDetails(id: string) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/movie/${id}?api_key=${apiKey}&append_to_response=credits,release_dates`,
  );

  console.log(response);

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

  const director = movieDetails?.credits.crew.find((c) => c.job === "Director");
  const directorJobs = movieDetails?.credits.crew
    .filter((c) => c.id === director?.id)
    .map((c) => c.job);

  const story = movieDetails?.credits.crew.find((c) => c.job === "Story");
  const storyJobs = movieDetails?.credits.crew
    .filter((c) => c.id === story?.id)
    .map((c) => c.job);

  const screenplays = movieDetails?.credits.crew
    .filter((c) => c.job === "Screenplay")
    .slice(0, 3);

  const screenplayInfo = screenplays?.map((s) => {
    const jobs = movieDetails?.credits.crew
      .filter((crew) => crew.id === s.id)
      .map((crew) => crew.job);
    return (
      <div key={s.id} className={styles.crewMember}>
        <p>{s.name}</p>
        <p>{jobs?.join(", ")}</p>
      </div>
    );
  });

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

              <div className={styles.info}>
                <p className={styles.tagline}>{movieDetails?.tagline}</p>
                <h3>Overview</h3>
                <p>{movieDetails?.overview}</p>
              </div>

              <div className={styles.crewGrid}>
                <div className={styles.crewMember}>
                  <p>{director?.name}</p>
                  <p>{directorJobs?.join(", ")}</p>
                </div>

                {screenplayInfo}

                <div className={styles.crewMember}>
                  <p>{story?.name}</p>
                  <p>{storyJobs?.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleColumn>
  );
}
