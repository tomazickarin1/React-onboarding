export type Styles = {
  showcase: string;
  showcaseHeader: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
