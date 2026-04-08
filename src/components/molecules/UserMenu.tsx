import { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon/Icon";
import styles from "./UserMenu.module.scss";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.userMenu}>
      <button onClick={toggleOpen} aria-expanded={isOpen} aria-label="User menu">
        <Icon icon={faUser} />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <a href="#">Login</a>
          <a href="#">Join</a>
        </div>
      )}
    </div>
  );
}
