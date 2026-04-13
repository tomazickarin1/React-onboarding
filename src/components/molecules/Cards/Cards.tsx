import styles from "./Cards.module.scss";
import Card from "../../atoms/Card/Card";

interface CardsProps {
  cards: Array<{ id: number; url: string; title: string; date: string }>;
}

export default function Cards({ cards }: CardsProps) {
  return (
    <>
      <div className={styles.showcaseCards}>
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              image={card.url}
              title={card.title}
              date={card.date}
            />
          );
        })}
      </div>
    </>
  );
}
