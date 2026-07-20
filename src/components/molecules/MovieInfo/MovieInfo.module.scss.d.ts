export type Styles = {
  info: string;
  tagline: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
