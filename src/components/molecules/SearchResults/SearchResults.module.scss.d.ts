export type Styles = {
  dropdownList: string;
  highlighted: string;
  rowInner: string;
  trendingHeader: string;
  trendingHeaderInner: string;
  trendingMovies: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
