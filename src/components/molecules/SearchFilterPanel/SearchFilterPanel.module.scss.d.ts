export type Styles = {
  searchFilters: string;
  searchHeader: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
