import styles from "./SearchPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import { Outlet, Link } from "react-router";

export default function SearchPage() {
  return (
    <SingleColumn>
      <div className={styles.searchWrapper}>
        <div className={styles.searchFilters}>
          <div className={styles.searchHeader}>
            <h3>Search Results</h3>
          </div>
          <div>
            <ul>
              <li>
                <Link to="tv">TV Show</Link>
                <span>3</span>
              </li>
              <li>
                <Link to="movie">Movies</Link>
                <span>3</span>
              </li>
              <li>
                <Link to="person">People</Link>
                <span>3</span>
              </li>
              <li>
                <Link to="collection">Collections</Link>
                <span>3</span>
              </li>
              <li>
                <Link to="company">Companies</Link>
                <span>3</span>
              </li>
              <li>
                <Link to="keyword">Keywords</Link>
                <span>3</span>
              </li>
            </ul>
          </div>
        </div>
          <Outlet />
      </div>
    </SingleColumn>
  );
}
