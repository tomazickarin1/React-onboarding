import { useState, useRef, useEffect } from "react";
import styles from "./LanguageSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export interface LanguageSelectProps {
  languageList: Array<{ code: string; label: string }>;
  selected: string;
  onSelect: (code: string, type: "primary" | "fallback") => void;
  type: "primary" | "fallback";
}

export default function LanguageSelect({
  languageList,
  selected,
  onSelect,
  type,
}: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const foundLanguage = languageList.find((label) => label.code === selected);
  let selectedLabel;

  console.log(foundLanguage);

  if (foundLanguage) {
    selectedLabel = foundLanguage.label;
  } else {
    selectedLabel = selected;
  }

  const renderedList = () => {
    return languageList
      .filter((list) => list.label.toLowerCase().includes(filter.toLowerCase()))
      .map((list) => {
        return (
          <li
            key={list.code}
            onMouseDown={() => {
              onSelect(list.code, type);
            }}
          >
            {list.label} ({list.code})
          </li>
        );
      });
  };

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <button type="button" onClick={handleOpen} className={styles.languageBtn}>
        {selectedLabel} ({selected})
        <FontAwesomeIcon icon={faCaretDown} />
      </button>

      {isOpen && (
        <div className={styles.selectBox}>
          <div className={styles.searchBar}>
            <div className={styles.searchBarInner}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                type="text"
                value={filter}
                onChange={handleFilter}
                placeholder="Filter"
              />
            </div>
          </div>

          <ul>{renderedList()}</ul>
        </div>
      )}
    </div>
  );
}
