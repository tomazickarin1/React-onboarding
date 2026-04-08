import styles from "./NavigationBar.module.scss";
import MainMenu from "../../components/mainmenu/MainMenu";
import LanguageSwitcherHandler from "../../components/languageSwitcher/LanguageSwitcherHandler";
import logo from "../../assets/logo.svg";
import plus from "../../assets/plus.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function NavigationBar() {
  return (
    <>
      <div className={styles.navbarWrapper}>
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <a href="/" className={styles.logo} aria-label="Home">
              <img src={logo} />
            </a>
            <MainMenu />
          </div>
          <div className={styles.right}>
            <a
              href=""
              aria-label="Create New Movie or TV Show"
              className={styles.plus}
            >
              <img src={plus} />
            </a>
            <LanguageSwitcherHandler />
            <a href="#">Login link</a>
            <a href="#">Join link</a>
            <div className={styles.serchIcon}>
              <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            </div>
          </div>
        </nav>
      </div>

      <div className={styles.searchBarWrapper}>
        <form className={styles.searchBar} role="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
          <input
            type="search"
            aria-label="Search for a movie, tv show, person"
            placeholder="Search for a movie, tv show, person..."
          />
        </form>
      </div>
    </>
  );
}
