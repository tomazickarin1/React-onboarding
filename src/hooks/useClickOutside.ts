// Another example:
// import { useEffect, type RefObject } from "react";

// export function useClickOutside(
//   ref: RefObject<HTMLElement | null>,
//   onClickOutside: () => void,
// ): void {
//   useEffect(() => {

//     const handleMouseDown = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         onClickOutside();
//       }
//     };

//     document.addEventListener("mousedown", handleMouseDown);
//     return () => {
//       document.removeEventListener("mousedown", handleMouseDown);
//     };
//   }, [ref, onClickOutside]);
// }

// returns a boolean
import { useEffect, useState, type RefObject } from "react";

export function useClickOutside(ref: RefObject<HTMLElement | null>): boolean {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsClickedOutside(true);
      } else {
        setIsClickedOutside(false);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        setIsClickedOutside(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [ref]);

  return isClickedOutside;
}
