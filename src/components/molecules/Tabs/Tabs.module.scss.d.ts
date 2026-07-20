export type Styles = {
  activeBtnWrapper: string;
  activeOption: string;
  dropdownWrapper: string;
  iconDown: string;
  mobileDropdown: string;
  mobileDropdownList: string;
  mobileSelect: string;
  selectorWrap: string;
  slider: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
