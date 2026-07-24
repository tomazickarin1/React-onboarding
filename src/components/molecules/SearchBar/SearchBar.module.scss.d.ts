export type Styles = {
  empty: string;
  searchBar: string;
  searchBarWrapper: string;
  trendingHeader: string;
  trendingHeaderInner: string;
  trendingMovies: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
