export type Styles = {
  default: string;
  language: string;
  reset: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
