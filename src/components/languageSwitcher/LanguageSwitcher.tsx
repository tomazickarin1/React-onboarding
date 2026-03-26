import { useState } from "react";

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
  const [main, setMain] = useState(selectedMain);

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("click on reset");
  };

  const onSelect = (code: string, type: "primary" | "fallback") => {
    console.log(code, type);
    if (type === 'primary')  setMain(code);
  };

  const handleSelectPrimary = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value, "primary");

    console.log(e.target)
  };
  const handleSelectFallback = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value, "fallback");
  };

  return (
    <>
      <div>{selectedMain}</div>
      <div>{selectedFallback}</div>

      <div>
        <div>selected: {main}</div>
        <form action="">
          <fieldset>
            <legend>Language Preferences</legend>

            <div>
              <label htmlFor="defaultLanguage">Default Language</label>
              <button onClick={onReset} className="restButton">
                Reset
              </button>
              <select
                name=""
                id="defaultLanguage"
                onChange={handleSelectPrimary}
              >
                {languageList.map((list) => (
                  <option key={list.code} value={list.code}>
                    {list.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fallbackLanguage">Fallback Language</label>
              <select
                name=""
                id="fallbackLanguage"
                onChange={handleSelectFallback}
              >
                {languageList.map((list) => (
                  <option key={list.code} value={list.label}>
                    {list.label}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
