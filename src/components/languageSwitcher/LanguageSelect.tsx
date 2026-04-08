import { useState, useRef, useEffect } from "react";
import styles from "./LanguageSelect.module.scss";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon/Icon";
import Input from "../atoms/Input/Input";

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
  const [highlighted, setHighlighted] = useState<string | null>(null);

  // refs
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlighted(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    if (!isOpen) {
      // if dropdwown closed - if its closed when you clik it
      setTimeout(() => {
        if (inputRef.current !== null) {
          inputRef.current.focus();
        }
      }, 0); // run after react finishes updating the DOM - wait untill the dropdown is there to focus
    } else {
      setHighlighted(null);
    }
    setIsOpen(!isOpen);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setHighlighted(null);
    } else if (e.key === "Enter" && highlighted) {
      onSelect(highlighted, type);
      setIsOpen(false);
      setHighlighted(null);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      const filtered = languageList.filter((item) =>
        item.label.toLowerCase().includes(filter.toLowerCase()),
      );

      let listItems: HTMLLIElement[]; // will be array

      if (listRef.current !== null) {
        const lanList = listRef.current.querySelectorAll("li"); // search gor lis inside listRef ul
        listItems = Array.from(lanList); // convert lanList into array
      } else {
        listItems = [];
      }

      const i = listItems.indexOf(document.activeElement as HTMLLIElement); // the position of selected element inside listItems array

      if (e.key === "ArrowDown") {
        const next = i + 1 < listItems.length ? i + 1 : 0; // check if the next item is smaller than the listItems array - if its grather move to the first index - to the start of the list

        if (!filtered[next]) return; // if there is no next

        (listItems[next] as HTMLElement).focus(); // focus on the next one when going dow/up with the arrow

        setHighlighted(filtered[next].code);
      } else {
        // ArrowUp
        if (i <= 0) {
          // if you are at the first item or the input and you go up
          if (inputRef.current !== null) {
            inputRef.current.focus(); // move focus to the input
          }
          setHighlighted(null); // remove hilight (so the hilihted is currently selected)
        } else {
          (listItems[i - 1] as HTMLElement).focus(); // focus on one step above the current one

          const itemAbove = filtered[i - 1]; // item you are moving up to

          if (itemAbove !== undefined) {
            setHighlighted(itemAbove.code);
          } else {
            setHighlighted(null);
          }
        }
      }
    }
  };

  let activeCode;
  if (highlighted !== null) {
    // if highlighted/selected with arrow up/down
    activeCode = highlighted;
  } else {
    activeCode = selected; // fallback to already selected one
  }

  const foundLanguage = languageList.find(
    (language) => language.code === activeCode,
  ); // active lang object

  let activeLabel;
  if (foundLanguage !== undefined) {
    activeLabel = foundLanguage.label; // display label
  } else {
    activeLabel = activeCode; // if no label just show the code
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
            className={
              list.code === (highlighted ?? selected) ? styles.active : "" // checks and adds active class if active
            }
            role="option"
            tabIndex={0}
            aria-selected={list.code === (highlighted ?? selected)}
          >
            {list.label} ({list.code})
          </li>
        );
      });
  };

  return (
    <div
      className={styles.selectWrapper}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={handleOpen}
        className={styles.languageBtn}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {activeLabel} ({activeCode})
        <Icon icon={faCaretDown} />
      </button>

      {isOpen && (
        <div className={styles.selectBox}>
          <div className={styles.searchBar}>
            <div className={styles.searchBarInner}>
              <Icon icon={faMagnifyingGlass} />
              <Input
                value={filter}
                onChange={handleFilter}
                placeholder="Filter"
                ariaLabel="Filter languages"
                ref={inputRef}
              />
            </div>
          </div>

          <ul role="listbox" ref={listRef}>
            {renderedList()}
          </ul>
        </div>
      )}
    </div>
  );
}
