export type Styles = {
  image: string;
  info: string;
  personCard: string;
  placeholder: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
