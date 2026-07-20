export type Styles = {
  main: string;
  singleColumnWrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
