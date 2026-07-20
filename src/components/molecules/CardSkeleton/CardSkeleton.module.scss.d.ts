export type Styles = {
  cardSkeleton: string;
  loadingWrapper: string;
  placeholder: string;
  popular: string;
  showcase: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
