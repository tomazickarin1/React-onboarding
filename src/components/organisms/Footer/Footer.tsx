import tmdbLogo from "../../../assets/logo.svg";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={tmdbLogo} alt="The Movie Database" />
    </footer>
  );
}
