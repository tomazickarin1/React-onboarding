export interface LanguageSwitcherProps {
  languageList: Array<{ code: string; label: string }>;
  selectedMain: string;
  selectedFallback: string;
  // onSelect: (code: string, type: "primary" | "fallback") => void;
  // onReset: () => void;
}

// Handlers
// onSelect: (code: string, type: "primary"|"fallback") => void,
// onReset: () => void

// Props
// languageList: {code: string, label: string},
// selectedMain: string,
// selectedFallback: string




export default function LanguageSwitcher({
  languageList,
  selectedMain,
  selectedFallback,
}: LanguageSwitcherProps) {
  return (
    <>
      <div>{selectedMain}</div>
      <input type="text" />
      
      {languageList.map((list) => (
        <li key={list.code}>
          {list.code}
          {list.label}
        </li>
      ))}

      <div>{selectedFallback}</div>
    </>
  );
}
