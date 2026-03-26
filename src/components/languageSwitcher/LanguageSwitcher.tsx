import styles from "./LanguageSwitcher.module.scss";
import { useState } from "react";

export interface LanguageSwitcherProps {
  languageList: Array<{ code: string; label: string }>;
  selectedMain: string;
  selectedFallback: string;
  onSelect: (code: string, type: "primary" | "fallback") => void;
  onReset: () => void;
}

export default function LanguageSwitcher({
  languageList,
  selectedMain,
  selectedFallback,
  onSelect,
  onReset,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectPrimary = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value, "primary");
  };

  const handleSelectFallback = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value, "fallback");
  };

  return (
    <section className={styles.languageSwitcher}>
      <button className={styles.languageButton} onClick={handleOpen}>
        {selectedMain.split("-").pop()}
      </button>
      {isOpen && (
        <div className={styles.languageDropdown}>
          <form>
            <fieldset>
              <legend>Language Preferences</legend>
              <div className={styles.defaultLanguage}>
                <div className={styles.defaultLanguageHeader}>
                  <label htmlFor="defaultLanguage">Default Language</label>
                  <button onClick={onReset} className={styles.restButton}>
                    Reset
                  </button>
                </div>

                <select
                  name="Default Language"
                  id="defaultLanguage"
                  value={selectedMain}
                  onChange={handleSelectPrimary}
                >
                  {languageList.map((list) => (
                    <option key={list.code} value={list.code}>
                      {list.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fallbackLanguage">Fallback Language</label>
                <select
                  name=""
                  id="fallbackLanguage"
                  value={selectedFallback}
                  onChange={handleSelectFallback}
                >
                  {languageList.map((list) => (
                    <option key={list.code} value={list.code}>
                      {list.label}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </section>
  );
}
