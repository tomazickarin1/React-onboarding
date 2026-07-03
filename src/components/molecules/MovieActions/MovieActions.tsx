import styles from "./MovieActions.module.scss";
import IconButton from "../../atoms/IconButton/IconButton";
import {
  faList,
  faHeart,
  faBookmark,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovieActions() {
  return (
    <div className={styles.actions}>
      <IconButton icon={faList} />
      <IconButton icon={faHeart} />
      <IconButton icon={faBookmark} />
      <button className={styles.trailerButton}>
        <FontAwesomeIcon icon={faPlay} /> Play Trailer
      </button>
    </div>
  );
}
