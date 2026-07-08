import styles from "./ScoreCircle.module.scss";

type MoviesProps = { score: number };

export default function ScoreCircle({ score }: MoviesProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const scoreOffset = ((100 - score) / 100) * circumference;
  const scoreColor =
    score >= 70 ? "#21d07a" : score >= 40 ? "#d2d531" : "#db2360";

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
