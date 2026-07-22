import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { formatDate } from "../../../utils/formatDate";

type CardProps = {
  id: string;
  image?: string;
  title: string;
  date?: string;
  variant: "showcase" | "popular";
};

export default function Card({ image, title, date, variant, id }: CardProps) {
  const movieUrl = `/movie/${id}-${title ? title.toLowerCase().replace(/\s+/g, "-") : ""}`;

  return (
    <div className={`${styles.showcaseCard} ${styles[variant]}`}>
      <div className={image ? "" : styles.placeholder}>
        <Link to={movieUrl}>
          {image ? (
            <img src={image} alt="placeholder image" />
          ) : (
            <FontAwesomeIcon icon={faImage} />
          )}
        </Link>
      </div>
      <div className={styles.cardText}>
        <h3>
          <Link to={movieUrl}>{title}</Link>
        </h3>

        {date && (
          <time className={styles.date} dateTime={date}>
            {formatDate(date)}
          </time>
        )}
      </div>
    </div>
  );
}
