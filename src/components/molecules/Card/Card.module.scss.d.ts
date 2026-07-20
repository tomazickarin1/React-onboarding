export type Styles = {
  cardText: string;
  date: string;
  placeholder: string;
  popular: string;
  showcase: string;
  showcaseCard: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
