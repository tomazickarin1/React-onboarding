export type Styles = {
  rowInner: string;
  searchBar: string;
  searchBarWrapper: string;
  trendingHeader: string;
  trendingHeaderInner: string;
  trendingList: string;
  trendingMovies: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
