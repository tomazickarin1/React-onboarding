import { useRef, useState } from "react";
import styles from "./UserMenu.module.scss";
import profileIcon from "../../../assets/profile.svg";
import { useClickOutside } from "../../../hooks/useClickOutside";

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
  const usermenuRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useClickOutside(usermenuRef);

  const isVisible = isOpen && !isClickedOutside;

  const toggleOpen = () => {
    setIsOpen(!isVisible);
  };

  console.log("is visible:", isVisible);

  console.log("is opened", isOpen);
  console.log("is not clicked outside", !isClickedOutside);

  console.log("------------");

  return (
    <div className={styles.userMenu} ref={usermenuRef}>
      <button
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <img src={profileIcon} alt="" />
      </button>
      {isVisible && (
        <div className={styles.dropdown}>
          <a>{loginLabel}</a>
          <a>{joinLabel}</a>
        </div>
      )}
    </div>
  );
}
