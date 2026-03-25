import MainMenuItem from "./MainMenuItem";
import styles from "./MainMenu.module.scss";
import {menuItems} from "../../data/menuItems";

export default function MainMenu() {
  return (
    <ul className={styles.mainMenuItem}>
      {menuItems.map((item) => (
        <MainMenuItem key={item.id} label={item.label} links={item.links} />
      ))}
    </ul>
  );
}
