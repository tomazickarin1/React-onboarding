// functional component
import MainMenu from "./components/mainmenu/MainMenu";
import styles from './App.module.scss'

export default function App() {
  return (
    <div className={styles.movieapp}>
      <MainMenu />
    </div>
  );
}
