import styles from "./Pagination.module.scss";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "react-router";

type PaginationData = {
  page: number;
  totalPages: number;
};

export default function Pagination({ page, totalPages }: PaginationData) {
  const [searchParams] = useSearchParams();

  function pageHref(targetPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", targetPage.toString());
    return `?${params.toString()}`;
  }

  // calculate start page
  const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));
  // calculate which 5 pages are showing
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }).map(
    (e, i) => startPage + i,
  );

  const currentPage = Math.min(Math.max(page, 1), totalPages);

  let prevLink;
  let nextLink;

  if (currentPage > 1) {
    prevLink = (
      <Link to={pageHref(currentPage - 1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
    );
  } else {
    prevLink = (
      <span aria-hidden="true">
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>
    );
  }

   if (currentPage < totalPages) {
    nextLink = (
      <Link to={pageHref(currentPage + 1)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    );
  } else {
    nextLink = (
      <span aria-hidden="true">
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    );
  }

  return (
    <nav className={styles.pageNumbers}>
      {prevLink}
      {pageNumbers.map((pageNum) => (
        <Link
          key={pageNum}
          to={pageHref(pageNum)}
          data-active={currentPage == pageNum}
        >
          {pageNum}
        </Link>
      ))}
      {nextLink}
    </nav>
  );
}
