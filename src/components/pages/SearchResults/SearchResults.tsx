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
import PersonCard from "../../atoms/PersonCard/PersonCard";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

type Movie = {
  id: number;
  url: string;
  title: string;
  date: string;
  description: string;
};
type Person = { id: number; name: string; department: string };
type SimpleItem = { id: number; name: string };

type SearchResult =
  | { kind: "media"; movies: Movie[]; totalPages: number }
  | { kind: "person"; people: Person[]; totalPages: number }
  | { kind: "simple"; items: SimpleItem[]; totalPages: number };

const mediaItemSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
  overview: z.string().optional(),
});

const personItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  known_for_department: z.string().optional(),
});

const simpleItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

function responseEnvelope<T extends z.ZodType>(itemSchema: T) {
  return z.object({ results: z.array(itemSchema), total_pages: z.number() });
}

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

  let searchResult: SearchResult;

  if (filter === "person") {
    const data = responseEnvelope(personItemSchema).parse(json);
    searchResult = {
      kind: "person",
      people: data.results.map((p) => ({
        id: p.id,
        name: p.name,
        department: p.known_for_department ?? "",
      })),
      totalPages: data.total_pages,
    };
  } else if (filter === "keyword" || filter === "company") {
    const data = responseEnvelope(simpleItemSchema).parse(json);
    searchResult = {
      kind: "simple",
      items: data.results.map((r) => ({ id: r.id, name: r.name })),
      totalPages: data.total_pages,
    };
  } else {
    const data = responseEnvelope(mediaItemSchema).parse(json);
    searchResult = {
      kind: "media",
      movies: data.results.map((m) => ({
        id: m.id,
        title: m.title ?? m.name ?? "",
        url: m.poster_path ? `${tmbImageUrl}${m.poster_path}` : "",
        date: m.release_date ?? m.first_air_date ?? "",
        description: m.overview ?? "",
      })),
      totalPages: data.total_pages,
    };
  }

  return searchResult;
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

  let contentData;

  if (data.kind === "person") {
    contentData = data.people.map((person) => <PersonCard key={person.id} />);
  } else if (data.kind === "simple") {
    contentData = data.items.map((item) => <p key={item.id}>{item.name}</p>);
  } else {
    contentData = data.movies.map((movie) => (
      <MovieCard
        key={movie.id}
        id={String(movie.id)}
        imageUrl={movie.url}
        title={movie.title}
        date={movie.date ? formatDate(movie.date) : ""}
        content={movie.description}
        isLoading={isLoading}
      />
    ));
  }

  return (
    <div className={styles.movieCards}>
      {contentData}
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
