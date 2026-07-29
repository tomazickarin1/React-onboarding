import styles from "./SearchPage.module.scss";
import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import SearchFilterPanel from "../../molecules/SearchFilterPanel/SearchFilterPanel";
import SearchFilterLink from "../../atoms/SearchFilterLink/SearchFilterLink";
import { Outlet, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchFilters } from "../../../data/filterList";
import { searchFilterPanelLabels } from "../../../data/labels";

const tmbUrl = "https://api.themoviedb.org/3";

async function fetchAllCounts(query: string) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const results = await Promise.all(
    searchFilters.map(({ linkName }) =>
      fetch(
        `${tmbUrl}/search/${linkName}?api_key=${apiKey}&query=${query}&page=1`,
      )
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

  const filteLinks = searchFilters.map((links) => {
    const match = totalCount?.find((r) => r.filter === links.linkName);
    const count = match?.count ?? 0;

    return (
      <SearchFilterLink
        key={links.linkName}
        linkName={links.linkName}
        linkLabel={links.label}
        count={count}
        searchParams={searchParams.toString()}
      />
    );
  });

  return (
    <SingleColumn>
      <div className={styles.searchWrapper}>
        <SearchFilterPanel heading={searchFilterPanelLabels.heading}>
          {filteLinks}
        </SearchFilterPanel>
        <Outlet />
      </div>
    </SingleColumn>
  );
}
