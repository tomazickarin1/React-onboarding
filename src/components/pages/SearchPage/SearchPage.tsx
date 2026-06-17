import styles from "./SearchPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import { Outlet } from "react-router";

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
                <a href="">TV Show</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Movies</a>
                <span>3</span>
              </li>
              <li>
                <a href="">People</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Collections</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Companies</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Keywords</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Networks</a>
                <span>3</span>
              </li>
              <li>
                <a href="">Awards</a>
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
