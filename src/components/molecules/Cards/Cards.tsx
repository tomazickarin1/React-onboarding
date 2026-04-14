import styles from "./Cards.module.scss";
import Card from "../../atoms/Card/Card";

interface CardsProps {
  movies: Array<{ id: number; url: string; title: string; date: string }>;
}

export default function Cards({ movies }: CardsProps) {
  return (
    <>
      <div className={styles.Cards}>
        {movies.map((movie) => {
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
    </>
  );
}
