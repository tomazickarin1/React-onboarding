// functional component
import MainMenu from "./MainMenu";
import styles from './App.module.scss'

// const links = [
//   { label: "Home", url: "/home" },
//   { label: "About", url: "/about" },
//   { label: "Contact", url: "/contact" }
// ]

export default function App() {
  return (
    <div className={styles.movieapp}>
      {/* <MainMenu label="Main menu 1" links={links} /> */}
      <MainMenu />

    </div>
  );
}
