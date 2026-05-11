import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import pladeholderPoster from "../../../assets/placeholder.jpg";

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
        <div className={styles.placeholder}>
          <FontAwesomeIcon icon={faImage} />
        </div>
        <div>
          <h3>Loading...</h3>
          <div className={styles.date}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.showcaseCard}>
      <img src={image ? image : pladeholderPoster} alt="" />
      <div>
        <a href="">
          <h3>{title}</h3>
        </a>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
}
