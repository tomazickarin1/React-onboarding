import styles from "./GenreFilter.module.scss";
import GenrePill from "../../atoms/GenrePill/GenrePill";

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
        return (
          <GenrePill
            key={g.id}
            isSelected={isSelected}
            genre={g}
            onToggle={() => {
              setSelectedGenres((prev) =>
                prev.includes(g.id)
                  ? prev.filter((id) => id !== g.id)
                  : [...prev, g.id],
              );
            }}
          />
        );
      })}
    </ul>
  );
}
