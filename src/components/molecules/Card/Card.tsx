import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { formatDate } from "../../../utils/formatDate";
import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

type CardProps = {
  id: string;
  image?: string;
  title: string;
  date?: string;
  variant: "showcase" | "popular";
  optionsPromptLabel: string;
  loginLabel: string;
  notAMemberLabel: string;
  signUpLabel: string;
};

export default function Card({
  image,
  title,
  date,
  variant,
  id,
  optionsPromptLabel,
  loginLabel,
  notAMemberLabel,
  signUpLabel,
}: CardProps) {
  const movieUrl = `/movie/${id}-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const [optionsOpen, setOptionsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useClickOutside(cardRef);

  const handleOptionsToggle = () => {
    setOptionsOpen(!optionsOpen);
  };

  return (
    <div className={`${styles.showcaseCard ?? ""} ${styles[variant] ?? ""}`}>
      <div
        className={image ? styles.posterImage : styles.placeholder}
        ref={cardRef}
      >
        <Link to={movieUrl}>
          {image ? (
            <img src={image} alt="placeholder image" />
          ) : (
            <FontAwesomeIcon icon={faImage} />
          )}
        </Link>
        <div className={styles.options} onClick={handleOptionsToggle}>
          <div className={styles.optionsToggle}></div>
          {optionsOpen && !isClickedOutside && (
            <div className={styles.optionsDropdown}>
              <div className={styles.optionsBlock}>
                <p className={styles.optionsPrompt}>{optionsPromptLabel}</p>
                <p className={styles.optionsAction}>
                  <a>
                    {loginLabel} <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </p>
              </div>
              <div className={styles.optionsBlock}>
                <p className={styles.optionsPrompt}>{notAMemberLabel}</p>
                <p className={styles.optionsAction ?? ""}>
                  <a>
                    {signUpLabel} <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
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
