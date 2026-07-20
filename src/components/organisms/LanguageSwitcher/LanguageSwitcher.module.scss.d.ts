export type Styles = {
  callout: string;
  defaultLanguage: string;
  defaultLanguageHeader: string;
  languageDropdown: string;
  languageSwitcher: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
