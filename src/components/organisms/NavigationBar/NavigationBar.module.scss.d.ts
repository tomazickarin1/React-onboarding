export type Styles = {
  joinDesktop: string;
  navbarWrapper: string;
  plus: string;
  right: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
