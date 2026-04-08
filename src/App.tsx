import NavigationBar from "./components/organisms/NavigationBar/NavigationBar";
import styles from "./App.module.scss";

export default function App() {

  return (
    <div className={styles.movieapp}>
      <NavigationBar />
    </div>
  );
}
