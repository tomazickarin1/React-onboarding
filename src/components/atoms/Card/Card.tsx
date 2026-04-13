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
      <h3>{title}</h3>
      <div>{date}</div>
    </div>
  );
}
