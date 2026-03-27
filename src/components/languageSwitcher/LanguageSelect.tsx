import { useState, useRef, useEffect } from "react";
import styles from "./LanguageSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const foundLanguage = languageList.find((label) => label.code === selected);
  let selectedLabel;

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
            onMouseDown={(e) => {
              e.stopPropagation();
              onSelect(list.code, type);
              setIsOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onSelect(list.code, type);
                setIsOpen(false);
              }
            }}
            className={list.code === selected ? styles.active : ""}
            role="option"
            tabIndex={0}
            aria-selected={list.code === selected}
          >
            {list.label} ({list.code})
          </li>
        );
      });
  };

  return (
    <div className={styles.selectWrapper} ref={ref} onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={handleOpen}
        className={styles.languageBtn}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {selectedLabel} ({selected})
        <FontAwesomeIcon icon={faCaretDown} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className={styles.selectBox}>
          <div className={styles.searchBar}>
            <div className={styles.searchBarInner}>
              <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
              <input
                type="text"
                value={filter}
                onChange={handleFilter}
                placeholder="Filter"
                aria-label="Filter languages"
              />
            </div>
          </div>

          <ul role="listbox">{renderedList()}</ul>
        </div>
      )}
    </div>
  );
}
