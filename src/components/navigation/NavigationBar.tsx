import styles from "./NavigationBar.module.scss";
import MainMenu from "../../components/mainmenu/MainMenu";
import LanguageSwitcherHandler from "../../components/languageSwitcher/LanguageSwitcherHandler";
import Icon from "../atoms/Icon/Icon";
import Input from "../atoms/Input/Input";
import UserMenu from "../molecules/UserMenu";

import logo from "../../assets/logo.svg";
import plus from "../../assets/plus.svg";
import mobileLogo from "../../assets/mobile-logo.svg";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

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

        <nav className={styles.mobileNavbar}>
          <button
            className={styles.burgerBtn}
            aria-label="Open menu"
            onClick={toggleOpen}
          >
            <Icon icon={faBars} />
          </button>
          <a href="/" className={styles.mobileLogo} aria-label="Home">
            <img src={mobileLogo} alt="" />
          </a>
          <div className={styles.mobileRight}>
            <UserMenu />
            <div className={styles.serchIcon}>
              <Icon icon={faMagnifyingGlass} />
            </div>
          </div>
        </nav>

        {menuOpen && (
          <div
            className={styles.overlay}
            onClick={() => {
              setMenuOpen(false);
            }}
          />
        )}
        <div
          className={`${styles.drawer ?? ""} ${menuOpen ? (styles.drawerOpen ?? "") : ""}`}
        >
          <MainMenu />
        </div>
      </div>

      <div className={styles.searchBarWrapper}>
        <form className={styles.searchBar} role="search">
          <Icon icon={faMagnifyingGlass} />
          <Input
            type="search"
            ariaLabel="Search for a movie, tv show, person"
            placeholder="Search for a movie, tv show, person..."
          />
        </form>
      </div>
    </>
  );
}
