import { useState } from "react";
export interface LanguageSelectProps {
  languageList: Array<{ code: string; label: string }>;
  selected: string;
  onSelect: (code: string, type: "primary" | "fallback") => void;
  type: "primary" | "fallback";
}

export default function LanguageSelect({
  languageList,
  selected,
  onSelect,
  type,
}: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  // const listLabels = (list: { code: string; label: string }) => {
  //   return list.label.toLowerCase().includes(filter.toLowerCase());
  // };

  // const filterList = () => {
  //   return languageList.filter(listLabels);
  // };

  // const searchedList = (list: { code: string; label: string }) => {
  //   return () => {
  //     onSelect(list.code, type);
  //   };
  // };

  const renderedList = () => {
    return languageList
      .filter((list) => list.label.toLowerCase().includes(filter.toLowerCase()))
      .map((list) => {
        return (
          <li key={list.code} onMouseDown={() => { onSelect(list.code, type); }}>{list.label}</li>
        );
      });
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        {selected}
      </button>

      {isOpen && (
        <div>
          <input type="text" value={filter} onChange={handleFilter} />
          <ul>{renderedList()}</ul>
        </div>
      )}

      <select
        name="Default Language"
        id="defaultLanguage"
        value={selected}
        onChange={(e) => {
          onSelect(e.target.value, type);
        }}
      >
        {languageList.map((list) => (
          <option key={list.code} value={list.code}>
            {list.label}
          </option>
        ))}
      </select>
    </>
  );
}
