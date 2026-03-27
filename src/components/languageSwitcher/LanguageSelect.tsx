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
  return (
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
  );
}
