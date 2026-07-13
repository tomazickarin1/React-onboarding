import styles from "./NavigationBar.module.scss";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import MobileNav from "../MobileNav/MobileNav";
import DesktopNav from "../DesktopNav/DesktopNav";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function NavigationBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearchSubmit() {
    const url = new URL("/search", window.location.origin);
    url.searchParams.set("query", query);
    void navigate(`${url.pathname}${url.search}`);
  }

  return (
    <>
      <div className={styles.navbarWrapper}>
        <DesktopNav />
        <MobileNav />
      </div>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSearchSubmit}
      />
    </>
  );
}
