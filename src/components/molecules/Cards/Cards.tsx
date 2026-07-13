import styles from "./Cards.module.scss";
import Card from "../../atoms/Card/Card";

type CardsProps = {
  movies: Array<{ id: number; url: string; title: string; date: string }>;
  isLoading: boolean;
  variant?: "showcase" | "popular"
}

export default function Cards({ movies, isLoading, variant = "showcase" }: CardsProps) {
  return (
    <div className={styles.Cards}>
      {isLoading
        ? Array.from({ length: 8 }).map((item, index) => (
            <Card key={index} isLoading={true} variant={variant} />
          ))
        : movies.map((movie) => {
            return (
              <Card
                key={movie.id}
                id={movie.id.toString()}
                image={movie.url}
                title={movie.title}
                date={movie.date}
                variant={variant}
              />
            );
          })}
    </div>
  );
}
