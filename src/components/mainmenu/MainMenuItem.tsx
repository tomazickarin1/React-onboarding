import styles from "./MainMenuItem.module.scss";
import MainMenuLink from "./MainMenuLink";
import MenuLinkList from "./MenuLinkList";
import { useState } from "react";

export interface MainMenuItemProps {
  label: string;
  links: Array<{ label: string; url: string }>;
}

export default function MainMenuItem({ label, links }: MainMenuItemProps) {
  const [open, setOpen] = useState(false);
  const toggleMenuOpen = () => {
    if (window.innerWidth < 768) {
      setOpen(!open);
    }
  };

  return (
    <li
      className={` ${styles.mainMenu ?? ""} ${open ? (styles.open ?? "") : ""}`}
    >
      <MainMenuLink label={label} handleMenuToggle={toggleMenuOpen} />
      <div className={styles.mainMenuList ?? ""}>
        <MenuLinkList links={links}></MenuLinkList>
      </div>
    </li>
  );
}
