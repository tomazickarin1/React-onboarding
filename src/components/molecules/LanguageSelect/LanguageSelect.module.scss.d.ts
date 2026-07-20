export type Styles = {
  active: string;
  languageBtn: string;
  searchBar: string;
  searchBarInner: string;
  selectBox: string;
  selectWrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
