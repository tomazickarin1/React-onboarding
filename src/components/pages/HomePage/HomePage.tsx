import SingleColumn from "../../templates/SingleColumn/SingleColumn";
// import ShowcaseFetch from "../../organisms/ShowcaseFetch/ShowcaseFetch";
import ShowcaseQueryFetch from "../../organisms/ShowcaseQueryFetch/ShowcaseQueryFetch";


export default function HomePage() {
  return (
    <SingleColumn>
      <ShowcaseQueryFetch />
    </SingleColumn>
  );
}
