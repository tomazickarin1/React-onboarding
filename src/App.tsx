// functional component
import MainMenu from "./components/mainmenu/MainMenu";
import LanguageSwitcher from "./components/languageSwitcher/LanguageSwitcher";
import styles from './App.module.scss'
import {languages} from "./data/language-list.json";
import { useState } from "react";

const languageList = languages.map((lang) => {
  const lastOpen = lang.lastIndexOf('(');
  return {
    label: lang.slice(0, lastOpen).trim(),
    code: lang.slice(lastOpen + 1, -1),
  };
});

export default function App() {

  const firstCode = languageList[0] ? languageList[0].code : '';
  const [main, setMain] = useState(localStorage.getItem('selectedMain') || firstCode);

  const handleSelect = (code: string, type: "primary" | "fallback") => {
    if (type === 'primary') {
      setMain(code);
      localStorage.setItem('selectedMain', code);
    }
  };

   const handleReset = () => {
    console.log("click on reset");
    setMain('');
  };

  return (
    <div className={styles.movieapp}>
      <MainMenu />
      <LanguageSwitcher languageList={languageList} selectedMain={main} onReset={handleReset} onSelect={handleSelect} />
    </div>
  );
}
