import styles from "./SearchPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import { Outlet, NavLink, useSearchParams } from "react-router";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const linkNames = [
    { label: "TV Show", link: "tv" },
    { label: "Movies", link: "movie" },
    { label: "People", link: "person" },
    { label: "Collections", link: "collection" },
    { label: "Companies", link: "company" },
    { label: "Keywords", link: "keyword" },
  ];

  return (
    <SingleColumn>
      <div className={styles.searchWrapper}>
        <div className={styles.searchFilters}>
          <div className={styles.searchHeader}>
            <h3>Search Results</h3>
          </div>
          <div>
            <ul>
              {linkNames.map((links) => (
                <li key={links.link}>
                  <NavLink
                    to={{ pathname: links.link , search: searchParams.toString() }}
                  >
                    {links.label}
                    <span>3</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </SingleColumn>
  );
}
