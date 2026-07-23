export type Styles = {
  searchBar: string;
  searchBarWrapper: string;
  trendingHeader: string;
  trendingList: string;
  trendingMovies: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
