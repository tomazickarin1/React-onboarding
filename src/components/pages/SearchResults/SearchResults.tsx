import styles from "./SearchResults.module.scss";
import MovieCard from "../../atoms/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import Pagination from "../../molecules/Pagination/Pagination";
import Spinner from "../../atoms/Spinner/Spinner";
import { searchResultsLabels } from "../../../data/labels";
import { z } from "zod";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  overview: z.string(),
});

const tmdbTvShowSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  first_air_date: z.string(),
  overview: z.string(),
});

const tmdbPeopleSchema = z.object({
  id: z.number(),
  name: z.string(),
  known_for_department: z.string().optional(),
  known_for: z.array(z.unknown()),
});

const tmdbCollectionsSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  overview: z.string(),
});

const tmdbKeywordsCompaniesSchema = z.object({
  id: z.number(),
  name: z.string(),
});

function tmdbResponseSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    results: z.array(itemSchema),
    total_pages: z.number(),
  });
}
type TmdbSearchResponse = { results: unknown[]; total_pages: number };

const defaultResponseSchema = tmdbResponseSchema(tmdbKeywordsCompaniesSchema);

const responseSchemasByFilter: Record<string, z.ZodType<TmdbSearchResponse>> = {
  movie: tmdbResponseSchema(tmdbMovieSchema),
  tv: tmdbResponseSchema(tmdbTvShowSchema),
  person: tmdbResponseSchema(tmdbPeopleSchema),
  collection: tmdbResponseSchema(tmdbCollectionsSchema),
  company: tmdbResponseSchema(tmdbKeywordsCompaniesSchema),
  keyword: tmdbResponseSchema(tmdbKeywordsCompaniesSchema),
};

function getResponseSchema(filter: string): z.ZodType<TmdbSearchResponse> {
  return responseSchemasByFilter[filter] ?? defaultResponseSchema;
}

type Movie = {
  id: number;
  url: string;
  title: string;
  date: string;
  description: string;
};

type SearchResult = { movies: Movie[]; totalPages: number };

async function fetchSearchMovies(
  page: number,
  filter: string,
  query: string,
): Promise<SearchResult> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/search/${filter}?api_key=${apiKey}&query=${query}&page=${String(page)}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = getResponseSchema(filter).parse(json);

  console.log(data);

  function toMovie(item: unknown, filter: string): Movie {
    if (filter === "movie") {
      const movie = tmdbMovieSchema.parse(item);
      return {
        id: movie.id,
        title: movie.title,
        url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
        date: movie.release_date,
        description: movie.overview,
      };
    }
    if (filter === "tv") {
      const tv = tmdbTvShowSchema.parse(item);
      return {
        id: tv.id,
        title: tv.name,
        url: tv.poster_path ? `${tmbImageUrl}${tv.poster_path}` : "",
        date: tv.first_air_date,
        description: tv.overview,
      };
    }
    if (filter === "person") {
      const person = tmdbPeopleSchema.parse(item);
      return {
        id: person.id,
        title: person.name,
        url: "",
        date: "",
        description: person.known_for_department ?? "",
      };
    }
    if (filter === "collection") {
      const collection = tmdbCollectionsSchema.parse(item);
      return {
        id: collection.id,
        title: collection.name,
        url: collection.poster_path
          ? `${tmbImageUrl}${collection.poster_path}`
          : "",
        date: "",
        description: collection.overview,
      };
    }
    const rest = tmdbKeywordsCompaniesSchema.parse(item);
    return {
      id: rest.id,
      title: rest.name,
      url: "",
      date: "",
      description: "",
    };
  }

  const searchData = {
    movies: data.results.map((item) => toMovie(item, filter)),
    totalPages: data.total_pages,
  };

  return searchData;
}

type SearchResultsProps = {
  errorLabel?: string;
  emptyLabel?: string;
};

export default function SearchResults({
  errorLabel = searchResultsLabels.error,
  emptyLabel = searchResultsLabels.empty,
}: SearchResultsProps) {
  const [page, setPage] = useState(1);
  const { filter } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-movies", page, filter, query],
    queryFn: () => fetchSearchMovies(page, filter ?? "tv", query),
  });

  if (error) {
    return <p>{error instanceof Error ? error.message : errorLabel}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>{emptyLabel}</p>;
  }

  return (
    <div className={styles.movieCards}>
      {data.movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={String(movie.id)}
          imageUrl={movie.url}
          title={movie.title}
          date={movie.date ? formatDate(movie.date) : ""}
          content={movie.description}
          isLoading={isLoading}
        />
      ))}

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
