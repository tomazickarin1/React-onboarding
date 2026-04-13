import styles from "./Card.module.scss";

interface CardProps {
  image?: string;
  title?: string;
  date?: string;
}

export default function Card({ image, title, date }: CardProps) {
  return (
    <div className={styles.showcaseCard}>
      <img src={image} alt="" />

      <div>
        <a href="">
          <h3>{title}</h3>
        </a>

        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
}
