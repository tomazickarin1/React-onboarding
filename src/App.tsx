import styles from "./App.module.scss";
import NavigationBar from "./components/organisms/NavigationBar/NavigationBar";
import Footer from "./components/organisms/Footer/Footer";

export default function App() {

  return (
    <div className={styles.movieapp}>
      <NavigationBar />
      <Footer/>
    </div>
  );
}
