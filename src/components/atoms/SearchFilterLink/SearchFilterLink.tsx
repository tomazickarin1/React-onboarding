import { NavLink } from "react-router";
import styles from "./SearchFilterLink.module.scss";

type searchFilterLinkProps = {
  linkName: string;
  linkLabel: string;
  count: number;
  searchParams: string;
};

export default function SearchFilterLink({
  linkName,
  linkLabel,
  count,
  searchParams,
}: searchFilterLinkProps) {
  return (
    <li className={styles.searchFilterLink}>
      <NavLink
        to={{
          pathname: linkName,
          search: searchParams,
        }}
      >
        {linkLabel}
        <span>{count}</span>
      </NavLink>
    </li>
  );
}
