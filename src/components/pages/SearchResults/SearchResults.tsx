import styles from "./SearchResults.module.scss";
import MovieCard from "../../atoms/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { formatDate } from "../../../utils/formatDate";
import Pagination from "../../molecules/Pagination/Pagination";
import Spinner from "../../atoms/Spinner/Spinner";
import PersonCard from "../../atoms/PersonCard/PersonCard";
import { UseDocumentTitle } from "../../../hooks/useDocumentTitle";
import { fetchSearchMovies } from "../../../utils/fetchSearchMovies";

type SearchResultsProps = {
  errorLabel: string;
  emptyLabel: string;
};

export default function SearchResults({
  errorLabel,
  emptyLabel,
}: SearchResultsProps) {
  const { filter } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  UseDocumentTitle(`${query} - The Movie Database(TMDB)`);

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
    contentData = data.people.map((person) => (
      <PersonCard
        key={person.id}
        name={person.name}
        department={person.department}
        profileImg={person.profileImg}
      />
    ));
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
      />
    ));
  }

  if (contentData.length == 0) {
    return <p>{emptyLabel}</p>;
  }

  return (
    <div className={styles.movieCards}>
      {contentData}
      <Pagination page={page} totalPages={data.totalPages} />
    </div>
  );
}
