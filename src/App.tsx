import styles from "./App.module.scss";
import HomePage from "./components/pages/HomePage/HomePage";

export default function App() {

  return (
    <div className={styles.movieapp}>
      <HomePage />
    </div>
  );
}
