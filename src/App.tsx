// functional component
import MainMenu from "./components/mainmenu/MainMenu";
// import LanguageSwitcher from "./components/languageSwitcher/LanguageSwitcher";
import LanguageSwitcherHandler from "./components/languageSwitcher/LanguageSwitcherHandler";
import styles from "./App.module.scss";
// import { languages } from "./data/language-list.json";
// import { useState } from "react";

// const languageList = languages.map((lang) => {
//   const lastOpen = lang.lastIndexOf("(");
//   return {
//     label: lang.slice(0, lastOpen).trim(),
//     code: lang.slice(lastOpen + 1, -1),
//   };
// });

export default function App() {
  // const firstCode = languageList[0] ? languageList[0].code : "";
  // const [main, setMain] = useState(
  //   localStorage.getItem("selectedMain") || firstCode,
  // );
  // const [fallback, setFallback] = useState(
  //   localStorage.getItem("selectedFallback") || firstCode,
  // );

  // const handleSelect = (code: string, type: "primary" | "fallback") => {
  //   if (type === "primary") {
  //     setMain(code);
  //     localStorage.setItem("selectedMain", code);
  //   } else {
  //     setFallback(code);
  //     localStorage.setItem("selectedFallback", code);
  //   }
  // };

  // const handleReset = () => {
  //   setMain(firstCode);
  //   setFallback(firstCode);
  //   localStorage.setItem("selectedMain", firstCode);
  //   localStorage.setItem("selectedFallback", firstCode);
  // };

  return (
    <div className={styles.movieapp}>
      <MainMenu />
      {/* <LanguageSwitcher
        languageList={languageList}
        selectedMain={main}
        selectedFallback={fallback}
        onReset={handleReset}
        onSelect={handleSelect}
      /> */}

      <LanguageSwitcherHandler/>
    </div>
  );
}
