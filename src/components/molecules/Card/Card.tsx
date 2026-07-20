import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

type CardProps = {
  id: string;
  image?: string;
  title?: string;
  date?: string;
  formatedDate?: string;
  variant: "showcase" | "popular";
};

export default function Card({
  image,
  title,
  date,
  formatedDate,
  variant,
  id,
}: CardProps) {
  return (
    <div className={`${styles.showcaseCard ?? ""} ${styles[variant] ?? ""}`}>
      <div className={image ? "" : styles.placeholder}>
        {image ? (
          <img src={image} alt="placeholder image" />
        ) : (
          <FontAwesomeIcon icon={faImage} />
        )}
      </div>
      <div className={styles.cardText}>
        <h3>
          <Link
            to={`/movie/${id}-${title ? title.toLowerCase().replace(/\s+/g, "-") : ""}`}
          >
            {title}
          </Link>
        </h3>
        <time className={styles.date} dateTime={date}>
          {formatedDate}
        </time>
      </div>
    </div>
  );
}
