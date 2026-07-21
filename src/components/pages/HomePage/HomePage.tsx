import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import ShowcaseQueryFetch from "../../organisms/ShowcaseQueryFetch/ShowcaseQueryFetch";
import { UseDocumentTitle } from "../../../hooks/useDocumentTitle";

export default function HomePage() {
  UseDocumentTitle("The Movie Database - (TMDB)");

  return (
    <SingleColumn>
      <ShowcaseQueryFetch />
    </SingleColumn>
  );
}
