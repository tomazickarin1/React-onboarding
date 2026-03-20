import MainMenuItem from "./MainMenuItem";

export default function MainMenu() {
  return (
    <div>
      <MainMenuItem label={"label1"} links={[{ label: "llll", url: "#" }]} />

      <MainMenuItem
        label="TV Shows"
        links={[
          { label: "Popular", url: "/tv/popular" },
          { label: "Top Rated", url: "/tv/top-rated" },
        ]}
      />
    </div>
  );
}
