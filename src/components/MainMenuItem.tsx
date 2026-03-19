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
  const toggleMenuOpen = () => { setOpen(!open); }

  console.log(open)

  return (
    <div className={styles.mainMenu}>
      <MainMenuLink label={label} handleMenuToggle={toggleMenuOpen} />
      <div className={`${styles.mainMenuList ?? ''} ${open ? styles.open ?? '' : ''}`}>
        <MenuLinkList links={links}></MenuLinkList>
      </div>
    </div>
  );
}
