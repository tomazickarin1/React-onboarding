import styles from "./MobileNav.module.scss";
import MainMenu from "../MainMenu/MainMenu";
import Icon from "../../atoms/Icon/Icon";
import UserMenu from "../../molecules/UserMenu/UserMenu";
import mobileLogo from "../../../assets/mobile-logo.svg";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
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
    </>
  );
}
