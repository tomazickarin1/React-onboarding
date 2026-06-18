import styles from "./SearchPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import { Outlet, NavLink, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const tmbUrl = "https://api.themoviedb.org/3";

async function fetchCount(filter: string, query: string) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await fetch(
     `${tmbUrl}/search/${filter}?api_key=${apiKey}&query=${query}`
  );
    const data = await response.json() as { total_results: number };

    return data.total_results;
}


export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";


  const tvQuery = useQuery({
    queryKey: ["count-tv", query],
    queryFn: () => fetchCount("tv", query),
  });

  const tvCount = tvQuery.data;

  console.log(tvCount);

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
                    <span>{tvCount}</span>
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
