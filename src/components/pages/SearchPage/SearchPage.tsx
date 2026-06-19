import styles from "./SearchPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import { Outlet, NavLink, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchFilters } from "../../../data/filterList";

const tmbUrl = "https://api.themoviedb.org/3";

async function fetchAllCounts(query: string) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const results = await Promise.all(
    searchFilters.map(({ linkName }) =>
      fetch(`${tmbUrl}/search/${linkName}?api_key=${apiKey}&query=${query}&page=1`)
        .then((r) => r.json() as Promise<{ total_results: number }>)
        .then((data) => ({ filter: linkName, count: data.total_results })),
    ),
  );

  return results;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const filterQuery = useQuery({
    queryKey: ["filter-counts", query],
    queryFn: () => fetchAllCounts(query),
  });

  const totalCount = filterQuery.data;

  console.log(totalCount);

  const filteLinks = searchFilters.map((links) => {
    const match = totalCount?.find((r) => r.filter === links.linkName);
    const count = match?.count ?? 0;

    return (
      <li key={links.linkName}>
        <NavLink
          to={{
            pathname: links.linkName,
            search: searchParams.toString(),
          }}
        >
          {links.label}
          <span>{count}</span>
        </NavLink>
      </li>
    );
  });

  return (
    <SingleColumn>
      <div className={styles.searchWrapper}>
        <div className={styles.searchFilters}>
          <div className={styles.searchHeader}>
            <h3>Search Results</h3>
          </div>
          <div>
            <ul>{filteLinks}</ul>
          </div>
        </div>
        <Outlet />
      </div>
    </SingleColumn>
  );
}
