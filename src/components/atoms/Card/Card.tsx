import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router";
import { cardLabels } from "../../../data/labels";

type CardProps = {
  id: string;
  image?: string;
  title?: string;
  date?: string;
  isLoading?: boolean;
  variant: "showcase" | "popular";
  loadingLabel?: string;
}

export default function Card({
  image,
  title,
  date,
  isLoading,
  variant,
  id,
  loadingLabel = cardLabels.loading,
}: CardProps) {
  if (isLoading) {
    return (
      <div className={`${styles.showcaseCard ?? ""} ${styles[variant] ?? ""}`}>
        <div className={styles.placeholder}>
          <FontAwesomeIcon icon={faImage} />
        </div>
        <div>
          <h3>{loadingLabel}</h3>
          <time className={styles.date}></time>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.showcaseCard ?? ""} ${styles[variant] ?? ""}`}>
      <div className={image ? "" : styles.placeholder}>
        <a href="">
          {image ? (
            <img src={image} alt="placeholder image" />
          ) : (
            <FontAwesomeIcon icon={faImage} />
          )}
        </a>
      </div>
      <div className={styles.cardText}>
        <h3>
          <Link
            to={`/movie/${id}-${title ? title.toLowerCase().replace(/\s+/g, "-") : ""}`}
          >
            {title}
          </Link>
        </h3>
        <time className={styles.date}>{date ? formatDate(date) : ""}</time>
      </div>
    </div>
  );
}
