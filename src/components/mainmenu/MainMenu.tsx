import MainMenuItem from "./MainMenuItem";
import MenuLinkList from "./MenuLinkList";
import styles from "./MainMenu.module.scss";
import { menuItems, mobileMenuItems, mobileMenuSmall } from "../../data/menuItems";
import { useEffect, useState } from "react";

export default function MainMenu() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 992);

  useEffect(() => {
    const watchWdith = window.matchMedia("(max-width: 767px)");

    function handler(e: MediaQueryListEvent) {
      setIsMobile(e.matches);
    }

    watchWdith.addEventListener("change", handler);

    return () => {
      watchWdith.removeEventListener("change", handler);
    };
  }, []);

  const items = isMobile ? mobileMenuItems : menuItems;

  return (
    <ul className={styles.mainMenuItem} role="menubar">
      {items.map((item) => (
        <MainMenuItem key={item.id} label={item.label} links={item.links} aria-label="Main menu" />
      ))}
      {isMobile && <MenuLinkList links={mobileMenuSmall} />}
    </ul>
  );
}
