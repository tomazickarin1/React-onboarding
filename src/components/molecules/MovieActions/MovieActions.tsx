import styles from "./MovieActions.module.scss";
import IconButton from "../../atoms/IconButton/IconButton";
import {
  faList,
  faHeart,
  faBookmark,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { movieActionsLabels } from "../../../data/labels";

export default function MovieActions() {
  return (
    <div className={styles.actions}>
      <IconButton icon={faList} label={movieActionsLabels.addToList} />
      <IconButton icon={faHeart} label={movieActionsLabels.addToFavorites} />
      <IconButton
        icon={faBookmark}
        label={movieActionsLabels.addToWatchlist}
      />
      <button className={styles.trailerButton}>
        <FontAwesomeIcon icon={faPlay} /> Play Trailer
      </button>
    </div>
  );
}
