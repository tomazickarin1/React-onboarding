import styles from "./DesktopNav.module.scss";
import MainMenu from "../MainMenu/MainMenu";
import LanguageSwitcherHandler from "../LanguageSwitcher/LanguageSwitcherHandler";
import Icon from "../../atoms/Icon/Icon";
import UserMenu from "../../molecules/UserMenu/UserMenu";

import logo from "../../../assets/logo.svg";
import plus from "../../../assets/plus.svg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { desktopNavLabels } from "../../../data/labels";

type DesktopNavProps = {
  homeAriaLabel?: string;
  createAriaLabel?: string;
  loginLinkLabel?: string;
  joinLinkLabel?: string;
};

export default function DesktopNav({
  homeAriaLabel = desktopNavLabels.homeAriaLabel,
  createAriaLabel = desktopNavLabels.createAriaLabel,
  loginLinkLabel = desktopNavLabels.loginLink,
  joinLinkLabel = desktopNavLabels.joinLink,
}: DesktopNavProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <a href="/" className={styles.logo} aria-label={homeAriaLabel}>
          <img src={logo} />
        </a>
        <MainMenu />
      </div>
      <div className={styles.right}>
        <a href="#" aria-label={createAriaLabel} className={styles.plus}>
          <img src={plus} />
        </a>
        <LanguageSwitcherHandler />
        <div className={styles.joinDesktop}>
          <a href="#">{loginLinkLabel}</a>
          <a href="#">{joinLinkLabel}</a>
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
