export type Styles = {
  scoreLabel: string;
  scoreWrapper: string;
  tooltip: string;
  tooltipWrapper: string;
  vibeButton: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
