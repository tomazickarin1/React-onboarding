export type Styles = {
  active: string;
  selector: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
