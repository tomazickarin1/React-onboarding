import styles from "./UserScore.module.scss";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ScoreCircle from "../../atoms/ScoreCircle/ScoreCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ScoreProps = { score: number };

export default function UserScore({ score }: ScoreProps) {
  const userScore = Math.round(score * 10);
  return (
    <div className={styles.scoreWrapper}>
      <ScoreCircle score={userScore} />
      <span className={styles.scoreLabel}>
        User
        <br />
        Score
      </span>
      <div className={styles.reactions}>
        <span>😍</span>
        <span>😆</span>
        <span>🥲</span>
      </div>
      <button className={styles.vibeButton}>
        What&apos;s your Vibe? <FontAwesomeIcon icon={faCircleInfo} />
      </button>
    </div>
  );
}
