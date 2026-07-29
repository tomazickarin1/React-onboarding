import { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../atoms/Icon/Icon";
import styles from "./UserMenu.module.scss";

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
        <Icon icon={faUser} />
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
