import { NavLink } from "react-router";

type searchFilterLinkProps = {
  linkName: string;
  linkLabel: string;
  count: number;
  searchParams: string;
}

export default function SearchFilterLink({
  linkName,
  linkLabel,
  count,
  searchParams,
}: searchFilterLinkProps) {
  return (
    <li>
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
