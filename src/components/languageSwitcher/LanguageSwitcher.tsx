export interface LanguageSwitcherProps {
  languageList: Array<{ code: string; label: string }>;
  selectedMain: string;
  selectedFallback: string;
  onSelect: (code: string, type: "primary" | "fallback") => void;
  onReset: () => void;
}

export default function LanguageSwitcher({
  languageList,
  selectedMain,
  selectedFallback,
  onSelect,
  onReset,
}: LanguageSwitcherProps) {
  const handleSelectPrimary = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value, "primary");
  };

  const handleSelectFallback = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value, "fallback");
  };

  return (
    <section>
      <button>{selectedMain}</button>
      <form>
        <fieldset>
          <legend>Language Preferences</legend>

          <div>
            <label htmlFor="defaultLanguage">Default Language</label>
            <button onClick={onReset} className="restButton">
              Reset
            </button>

            <select
              name="Default Language"
              id="defaultLanguage"
              value={selectedMain}
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
              value={selectedFallback}
              onChange={handleSelectFallback}
            >
              {languageList.map((list) => (
                <option key={list.code} value={list.code}>
                  {list.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
