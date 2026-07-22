import style from "./MovieCard.module.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export type MovieCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  content: string;
};

const MovieCard = ({ id, imageUrl, title, date, content }: MovieCardProps) => {
  const movieUrl = `/movie/${id}-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={style.movieCard}>
      <div className={imageUrl ? style.poster : style.placeholder}>
        <Link to={movieUrl}>
          {imageUrl ? (
            <img src={imageUrl} alt="placeholder image" />
          ) : (
            <FontAwesomeIcon icon={faImage} />
          )}
        </Link>
      </div>
      <div className={style.content}>
        <div>
          <Link to={movieUrl}>{title}</Link>
          <p className={style.date}>{date}</p>
        </div>
        <div>
          <p className={style.description}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
