import styles from "./Card.module.scss";
import placeholder from "../../../assets/placeholder.jpg"

interface CardProps {
  image?: string;
  title?: string;
  date?: string;
  isLoading?: boolean;
}

export default function Card({ image, title, date, isLoading }: CardProps) {

if (isLoading) {
  return (
    <div className={styles.showcaseCard}>
      <img src={placeholder} alt="" />
      <div>
        <h3>Loading...</h3>
        <div className={styles.date}></div>
      </div>
    </div>
  );
}


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
