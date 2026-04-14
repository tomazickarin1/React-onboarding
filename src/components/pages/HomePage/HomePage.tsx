import SingleColumn from "../../templates/SingleColumn/SingleColumn";
import Showcase from "../../organisms/Showcase/Showcase";

export default function HomePage() {
  const movies = [
    { id: 1, title: "Streaming", url: "/", date: "nov 15" },
    { id: 2, title: "On TV", url: "/", date: "nov 15" },
    { id: 3, title: "For Rent", url: "/", date: "nov 15" },
    { id: 4, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 5, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 6, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 7, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 8, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 9, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 10, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 11, title: "In Theatres", url: "/", date: "nov 15" },
    { id: 12, title: "In Theatres", url: "/", date: "nov 15" },
  ];

  return (
    <>
      <SingleColumn>
        <Showcase movies={movies} isLoading={false} />
      </SingleColumn>
    </>
  );
}
