export type Styles = {
  content: string;
  date: string;
  description: string;
  loading: string;
  movieCard: string;
  placeholder: string;
  poster: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
