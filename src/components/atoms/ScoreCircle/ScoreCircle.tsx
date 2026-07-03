import styles from "./ScoreCircle.module.scss";

type Movies = {score: number}

export default function ScoreCircle({score}: Movies) {

  const userScore = Math.round((score) * 10);
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const scoreOffset = ((100 - userScore) / 100) * circumference;
  const scoreColor = userScore >= 70 ? "#21d07a" : userScore >= 40 ? "#d2d531" : "#db2360";

  console.log(score);
  return (

    <svg viewBox="0 0 100 100" className={styles.scoreCircle}>
      <circle cx="50" cy="50" r="48" className={styles.scoreBg} />
      <circle cx="50" cy="50" r={radius} className={styles.scoreTrack} />
      <circle
        cx="50"
        cy="50"
        r={radius}
        className={styles.scoreProgress}
        strokeDasharray={circumference}
        strokeDashoffset={scoreOffset}
        stroke={scoreColor}
      />
    </svg>
  );
}
