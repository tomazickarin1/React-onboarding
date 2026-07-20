export type Styles = {
  mainMenu: string;
  mainMenuList: string;
  open: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
