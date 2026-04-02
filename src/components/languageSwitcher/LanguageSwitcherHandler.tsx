import { useState } from "react";
import { languages } from "./../../data/language-list.json";
import LanguageSwitcher from "./LanguageSwitcher";

const languageList = languages.map((lang) => {
  const lastOpen = lang.lastIndexOf("(");
  return {
    label: lang.slice(0, lastOpen).trim(),
    code: lang.slice(lastOpen + 1, -1),
  };
});

export default function LanguageSwitcherHandler() {
  const firstCode = languageList[0] ? languageList[0].code : "";
  const [main, setMain] = useState(
    localStorage.getItem("selectedMain") || firstCode,
  );
  const [fallback, setFallback] = useState(
    localStorage.getItem("selectedFallback") || firstCode,
  );

  const handleSelect = (code: string, type: "primary" | "fallback") => {
    if (type === "primary") {
      setMain(code);
      localStorage.setItem("selectedMain", code);
    } else {
      setFallback(code);
      localStorage.setItem("selectedFallback", code);
    }
  };

  const handleReset = () => {
    setMain(firstCode);
    setFallback(firstCode);
    localStorage.setItem("selectedMain", firstCode);
    localStorage.setItem("selectedFallback", firstCode);
  };

  return (
    <LanguageSwitcher
      languageList={languageList}
      selectedMain={main}
      selectedFallback={fallback}
      onReset={handleReset}
      onSelect={handleSelect}
    />
  );
}
