export type Styles = {
  joinDesktop: string;
  joinMobile: string;
  left: string;
  logo: string;
  navbar: string;
  plus: string;
  right: string;
  serchIcon: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
