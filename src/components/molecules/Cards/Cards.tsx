import styles from "./Cards.module.scss";
import Card from "../../atoms/Card/Card";

interface CardsProps {
  movies: Array<{ id: number; url: string; title: string; date: string }>;
  isLoading: boolean;
}

export default function Cards({ movies, isLoading }: CardsProps) {
  return (
    <div className={styles.Cards}>
      {isLoading
        ? Array.from({ length: 8 }).map((item, index) => (
            <Card key={index} isLoading={true} />
          ))
        : movies.map((movie) => {
            return (
              <Card
                key={movie.id}
                image={movie.url}
                title={movie.title}
                date={movie.date}
              />
            );
          })}
    </div>
  );
}
