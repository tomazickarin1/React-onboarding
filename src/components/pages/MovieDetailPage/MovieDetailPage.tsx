import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const tmbUrl = "https://api.themoviedb.org/3";


 interface MovieDetails {
    id: string;
    overview: string;
    title: string;
    // add more as you need them
  }


async function fetchMovieDetails(id: string) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(`${tmbUrl}/movie/${id}?api_key=${apiKey}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = (await response.json()) as MovieDetails;

  // console.log(data);

  return data;
}

export default function MovieDetailPage() {
  const movieId = useParams();
  // console.log(movieId);
  // console.log(movieId.id);

  const movieDetailQuery = useQuery({
    queryKey: ["movie-detail", movieId.id],
    queryFn: () => fetchMovieDetails(movieId.id ? movieId.id : ""),
  });


  const movieDetails = movieDetailQuery.data;
  console.log(movieDetails);

  return (
    <>
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h2>Toy story</h2>
          <p>Lorem ipsum</p>

          <div>
            <h5>Overview</h5>
            <p>{movieDetails?.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}
