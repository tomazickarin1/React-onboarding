export type Styles = {
  burgerBtn: string;
  drawer: string;
  drawerOpen: string;
  mobileLogo: string;
  mobileNavbar: string;
  mobileRight: string;
  overlay: string;
  serchIcon: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
