import styles from "./MovieInfo.module.scss";

type MovieInfoProps = { tagline: string; overview: string };

export default function MovieInfo({ tagline, overview }: MovieInfoProps) {
  return (
    <div className={styles.info}>
      <p className={styles.tagline}>{tagline}</p>
      <h3>Overview</h3>
      <p>{overview}</p>
    </div>
  );
}
