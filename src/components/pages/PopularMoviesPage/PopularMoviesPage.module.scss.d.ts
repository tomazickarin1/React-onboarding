export type Styles = {
  container: string;
  filterWrapper: string;
  moviesGrid: string;
  popularWrapper: string;
  submitBtn: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
