import styles from "./MovieInfo.module.scss";
import { movieInfoLabels } from "../../../data/labels";

type MovieInfoProps = {
  tagline: string;
  overview: string;
  overviewHeading?: string;
};

export default function MovieInfo({
  tagline,
  overview,
  overviewHeading = movieInfoLabels.overviewHeading,
}: MovieInfoProps) {
  return (
    <div className={styles.info}>
      <p className={styles.tagline}>{tagline}</p>
      <h3>{overviewHeading}</h3>
      <p>{overview}</p>
    </div>
  );
}
