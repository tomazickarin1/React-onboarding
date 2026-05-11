import style from "./MovieCard.module.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MovieCardProps {
  imageUrl: string;
  title: string;
  date: string;
  content: string;
  isLoading: boolean;
}

const MovieCard = ({
  imageUrl,
  title,
  date,
  content,
  isLoading,
}: MovieCardProps) => {
  if (isLoading) {
    return <div className={style.movieCard}>Loading...</div>;
  }

  return (
    <div className={style.movieCard}>
      <div className={imageUrl ? style.poster : style.placeholder}>
        <a href="#">
          {imageUrl ? <img src={imageUrl} alt="" /> : <FontAwesomeIcon icon={faImage} />}
        </a>
      </div>
      <div className={style.content}>
        <div>
          <a href="">{title}</a>
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
