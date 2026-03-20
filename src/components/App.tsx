// functional component
import MainMenu from "./MainMenu";
import styles from './App.module.scss'

export default function App() {
  return (
    <div className={styles.movieapp}>
      <MainMenu />
    </div>
  );
}
