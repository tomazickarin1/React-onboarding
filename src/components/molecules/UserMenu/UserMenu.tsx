import { useState } from "react";
import styles from "./UserMenu.module.scss";
import profileIcon from "../../../assets/profile.svg";

type UserMenuProps = {
  ariaLabel: string;
  loginLabel: string;
  joinLabel: string;
};

export default function UserMenu({
  ariaLabel,
  loginLabel,
  joinLabel,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.userMenu}>
      <button
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <img src={profileIcon} alt="" />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <a>{loginLabel}</a>
          <a>{joinLabel}</a>
        </div>
      )}
    </div>
  );
}
