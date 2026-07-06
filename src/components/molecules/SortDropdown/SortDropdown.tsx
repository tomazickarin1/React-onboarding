import styles from "./SortDropdown.module.scss";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../atoms/Icon/Icon";
import { useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

const DEFAULT_SORT = {
  value: "popularity.desc",
  label: "Popularity Descending",
};

const sortOptions = [
  DEFAULT_SORT,
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
];

type SortOption = {
  value: string;
  label: string;
};

type SortDropdownProps = {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
};

export default function SortDropdown({ sortBy, setSortBy }: SortDropdownProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const isClickedOutsideSort = useClickOutside(sortRef);

  const handleSortOpen = () => {
    const isCurrentlyOpen = isSortOpen && !isClickedOutsideSort;
    setIsSortOpen(!isCurrentlyOpen);
  };

  return (
    <div className={styles.sortWrapper} ref={sortRef}>
      <button
        type="button"
        onClick={handleSortOpen}
        className={styles.sortBtn}
        aria-expanded={isSortOpen}
        aria-haspopup="listbox"
      >
        {sortBy.label}
        <Icon icon={faCaretDown} className={styles.caret ?? ""} />
      </button>

      {isSortOpen && !isClickedOutsideSort && (
        <ul
          className={styles.sortList}
          role="listbox"
          aria-label="Sort results by"
        >
          {sortOptions.map((option) => (
            <li
              key={option.value}
              role="option"
              tabIndex={0}
              aria-selected={option.value === sortBy.value}
              className={option.value === sortBy.value ? styles.active : ""}
              onMouseDown={(e) => {
                e.stopPropagation();
                setSortBy(option);
                setIsSortOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
