import styles from "./LanguageSwitcher.module.scss";
import { useState, useRef } from "react";
import LanguageSelect from "../../molecules/LanguageSelect/LanguageSelect";
import Button from "../../atoms/Button/Button";
import { useClickOutside } from "../../../hooks/useClickOutside";

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
  const ref = useRef<HTMLElement>(null);

  // boolean value
  const isClickedOutside = useClickOutside(ref);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <section className={styles.languageSwitcher} ref={ref}>
      <Button
        variant="language"
        label={selectedMain.split("-").pop() ?? ""}
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-label="Language settings"
      />
      {isOpen && !isClickedOutside && (
        <div className={styles.languageDropdown}>
          <div className={styles.callout} />
          <form>
            <fieldset>
              <legend>Language Preferences</legend>
              <div className={styles.defaultLanguage}>
                <div className={styles.defaultLanguageHeader}>
                  <p>Default Language</p>
                  <Button label="Reset" variant="reset" onClick={onReset} />
                </div>
                <LanguageSelect
                  languageList={languageList}
                  selected={selectedMain}
                  type="primary"
                  onSelect={onSelect}
                />
              </div>
              <div>
                <p>Fallback Language</p>
                <LanguageSelect
                  languageList={languageList}
                  selected={selectedFallback}
                  type="fallback"
                  onSelect={onSelect}
                />
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </section>
  );
}
