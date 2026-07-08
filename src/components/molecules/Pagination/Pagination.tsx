import styles from "./Pagination.module.scss";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PaginationData = {
  onPageChange: (page: number) => void;
  page: number;
  totalPages: number;
};

export default function Pagination({
  onPageChange,
  page,
  totalPages,
}: PaginationData) {
  // calculate start page
  const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));
  // calculate which 5 pages are showing
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }).map(
    (e, i) => startPage + i,
  );

  return (
    <nav className={styles.pageNumbers}>
      <button
        onClick={() => {
          onPageChange(page - 1);
        }}
        disabled={page === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => {
            onPageChange(pageNum);
          }}
          data-active={page == pageNum}
        >
          {" "}
          {pageNum}
        </button>
      ))}
      <button
        onClick={() => {
          onPageChange(page + 1);
        }}
        disabled={page === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </nav>
  );
}
