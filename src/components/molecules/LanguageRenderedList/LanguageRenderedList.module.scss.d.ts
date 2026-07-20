export type Styles = {
  active: string;
  languageList: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
