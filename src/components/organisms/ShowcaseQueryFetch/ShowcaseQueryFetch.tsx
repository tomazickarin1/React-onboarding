import { useQuery } from "@tanstack/react-query";
import Showcase from "../Showcase/Showcase";
import { z } from "zod";
import { useState } from "react";
import { useRef } from "react";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
});

const tmdbResponseSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

// type Movie = { id: number; url: string; title: string; date: string };

type ShowcaseData = {
  streaming: [{ id: number; url: string; title: string; date: string }];
  rent: [{ id: number; url: string; title: string; date: string }];
  theater: [{ id: number; url: string; title: string; date: string }];
};

async function fetchPopularMovies(): Promise<ShowcaseData[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  // const response = await fetch(`${tmbUrl}/movie/popular?api_key=${apiKey}`);

  const responseStreaming = await fetch(
    `${tmbUrl}/discover/movie?api_key=${apiKey}&watch_region=US&with_watch_monetization_types=flatrate&sort_by=popularity.desc`,
  );
  const jsonStreaming: unknown = await responseStreaming.json();
  const streamingData = tmdbResponseSchema.parse(jsonStreaming);

  const responseRent = await fetch(
    `${tmbUrl}/discover/movie?api_key=${apiKey}&watch_region=US&with_watch_monetization_types=rent&sort_by=popularity.desc`,
  );
  const jsonRent: unknown = await responseRent.json();
  const rentData = tmdbResponseSchema.parse(jsonRent);

  const responseinTheaters = await fetch(
    `${tmbUrl}/movie/now_playing?api_key=${apiKey}&region=US`,
  );
  const jsoninTheaters: unknown = await responseinTheaters.json();
  const inTheatersData = tmdbResponseSchema.parse(jsoninTheaters);

  // if (!response.ok) {
  //   throw new Error(`Request failed with status ${String(response.status)}`);
  // }

  // const json: unknown = await response.json();
  // const data = tmdbResponseSchema.parse(json);

  // const allData = {
  //   streming: streamingData.results.map((movie) => ({
  //     id: movie.id,
  //     title: movie.title,
  //     url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
  //     date: movie.release_date,
  //   })),
  //   rent: rentData.results.map((movie) => ({
  //     id: movie.id,
  //     title: movie.title,
  //     url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
  //     date: movie.release_date,
  //   })),
  //   theater: inTheatersData.results.map((movie) => ({
  //     id: movie.id,
  //     title: movie.title,
  //     url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
  //     date: movie.release_date,
  //   })),
  // };

  // console.log(allData);

  return {
    streaming: streamingData.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date,
    })),
    rent: rentData.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date,
    })),
    theater: inTheatersData.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date,
    })),
  };

  // return data.results.map((movie) => ({
  //   id: movie.id,
  //   title: movie.title,
  //   url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
  //   date: movie.release_date,
  // }));
}

export default function ShowcaseQueryFetch() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["showcase-movies"],
    queryFn: fetchPopularMovies,
  });

  const [activeTab, setActiveTab] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  console.log(activeTab);

  if (error) {
    return (
      <p>{error instanceof Error ? error.message : "Something went wrong"}</p>
    );
  }

  let sdata;

  if (activeTab === 1) {
    console.log("one");

    sdata = data?.streaming;

  } else if (activeTab === 2) {
    console.log("two");
    sdata = data?.rent;

  } else if (activeTab === 3) {
    console.log("three");
    sdata = data?.theater;

  }


  return (
    <Showcase
      movies={sdata}
      isLoading={isLoading}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      ref={wrapperRef}
    />
  );
}
