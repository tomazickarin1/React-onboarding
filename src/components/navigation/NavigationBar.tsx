import styles from "./NavigationBar.module.scss";
import MainMenu from "../../components/mainmenu/MainMenu";
import LanguageSwitcherHandler from "../../components/languageSwitcher/LanguageSwitcherHandler";
import logo from "../../assets/logo.svg";
import plus from "../../assets/plus.svg";

export default function NavigationBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <a href="/" className={styles.logo} aria-label="Home">
          <img src={logo} />
        </a>

        <MainMenu />
      </div>
      <div className={styles.right}>
        <a href='' aria-label='Create New Movie or TV Show' className={styles.plus}>
          <img src={plus} />
        </a>
        <LanguageSwitcherHandler />
        <a href="#">Login link</a>
        <a href="#">Join link</a>
        <div>Search</div>
      </div>
    </div>
  );
}
