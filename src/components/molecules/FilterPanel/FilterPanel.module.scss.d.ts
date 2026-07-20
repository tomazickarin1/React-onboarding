export type Styles = {
  chevron: string;
  filter: string;
  filterPanel: string;
  name: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
