export type Styles = {
  actions: string;
  backdrop: string;
  backdropBackground: string;
  crewGrid: string;
  facts: string;
  innerWrapper: string;
  scoreWrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
