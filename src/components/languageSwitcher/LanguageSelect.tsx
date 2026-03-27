export interface LanguageSelectProps {
  languageList: Array<{ code: string; label: string }>;
  selected: string;
  onSelect: (code: string, type: "primary" | "fallback") => void;
}

export default function LanguageSelect({
  languageList,
  selected,
  onSelect,
}: LanguageSelectProps) {

  
  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "primary" | "fallback",
  ) => {
    onSelect(e.target.value, type);
  };

  return (
    <select
      name="Default Language"
      id="defaultLanguage"
      value={selected}
      onChange={(e) => {
        handleSelect(e, "primary");
      }}
    >
      {languageList.map((list) => (
        <option key={list.code} value={list.code}>
          {list.label}
        </option>
      ))}
    </select>
  );
}
