import styles from "./DesktopNav.module.scss";
import MainMenu from "../../mainmenu/MainMenu";
import LanguageSwitcherHandler from "../LanguageSwitcher/LanguageSwitcherHandler";
import Icon from "../../atoms/Icon/Icon";
import UserMenu from "../../molecules/UserMenu/UserMenu";

import logo from "../../../assets/logo.svg";
import plus from "../../../assets/plus.svg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function DesktopNav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <a href="/" className={styles.logo} aria-label="Home">
          <img src={logo} />
        </a>
        <MainMenu />
      </div>
      <div className={styles.right}>
        <a
          href="#"
          aria-label="Create New Movie or TV Show"
          className={styles.plus}
        >
          <img src={plus} />
        </a>
        <LanguageSwitcherHandler />
        <div className={styles.joinDesktop}>
          <a href="#">Login link</a>
          <a href="#">Join link</a>
        </div>
        <div className={styles.joinMobile}>
          <UserMenu />
        </div>
        <div className={styles.serchIcon}>
          <Icon icon={faMagnifyingGlass} />
        </div>
      </div>
    </nav>
  );
}
