export type Styles = {
  spin: string;
  spinner: string;
  spinnerWrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
