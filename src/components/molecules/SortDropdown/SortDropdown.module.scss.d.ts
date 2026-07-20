export type Styles = {
  active: string;
  sortBtn: string;
  sortList: string;
  sortWrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
