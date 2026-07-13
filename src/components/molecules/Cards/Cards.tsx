import styles from "./Cards.module.scss";
import Card from "../Card/Card";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { cardLabels } from "../../../data/labels";
import { formatDate } from "../../../utils/formatDate";

type CardsProps = {
  movies: Array<{ id: number; url: string; title: string; date: string }>;
  isLoading: boolean;
  variant?: "showcase" | "popular"
  loadingLabel?: string;
}

export default function Cards({ movies, isLoading, variant = "showcase", loadingLabel = cardLabels.loading, }: CardsProps) {
  return (
    <div className={styles.Cards}>
      {isLoading
        ? Array.from({ length: 8 }).map((item, index) => (
            <CardSkeleton key={index} loadingLabel={loadingLabel} variant={variant}/>
          ))
        : movies.map((movie) => {
          const date = formatDate(movie.date);
            return (
              <Card
                key={movie.id}
                id={movie.id.toString()}
                image={movie.url}
                title={movie.title}
                date={movie.date}
                formatedDate={date}
                variant={variant}
              />
            );
          })}
    </div>
  );
}
