import NavigationBar from "./components/navigation/NavigationBar";
import styles from "./App.module.scss";

export default function App() {

  return (
    <div className={styles.movieapp}>
      <NavigationBar />
    </div>
  );
}
