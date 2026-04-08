import styles from "./NavigationBar.module.scss";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import MobileNav from "../MobileNav/MobileNav";
import DesktopNav from "../DesktopNav/DesktopNav";

export default function NavigationBar() {
  return (
    <>
      <div className={styles.navbarWrapper}>
        <DesktopNav />
        <MobileNav />
      </div>
      <SearchBar />
    </>
  );
}
