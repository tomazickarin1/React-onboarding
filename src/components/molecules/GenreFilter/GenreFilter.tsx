import styles from "./GenreFilter.module.scss";

type Genre = { id: number; name: string };
type GenresProps = {
  genre: Genre[] | undefined;
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function GenreFilter({
  genre,
  selectedGenres,
  setSelectedGenres,
}: GenresProps) {
  return (
    <ul className={styles.genreList} aria-label="Filter by genre">
      {genre?.map((g) => {
        const isSelected = selectedGenres.includes(g.id);
        console.log(isSelected);
        return (
          <li
            key={g.id}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            onClick={() => {
              setSelectedGenres((prev) =>
                prev.includes(g.id)
                  ? prev.filter((id) => id !== g.id)
                  : [...prev, g.id],
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedGenres((prev) =>
                  prev.includes(g.id)
                    ? prev.filter((id) => id !== g.id)
                    : [...prev, g.id],
                );
              }
            }}
            className={isSelected ? (styles.active ?? "") : ""}
          >
            {g.name}
          </li>
        );
      })}
    </ul>
  );
}
