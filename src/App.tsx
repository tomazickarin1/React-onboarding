// functional component
import MainMenu from "./components/mainmenu/MainMenu";
import LanguageSwitcher from "./components/languageSwitcher/LanguageSwitcher";
import styles from './App.module.scss'
import {languages} from "./data/language-list.json";

const languageList = languages.map((lang) => {
  const lastOpen = lang.lastIndexOf('(');
  return {
    label: lang.slice(0, lastOpen).trim(),
    code: lang.slice(lastOpen + 1, -1),
  };
});

export default function App() {
  return (
    <div className={styles.movieapp}>
      <MainMenu />
      <LanguageSwitcher languageList={languageList} selectedMain={''} selectedFallback={''} />
    </div>
  );
}
