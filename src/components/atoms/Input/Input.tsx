import { forwardRef } from "react";
import styles from "./Input.module.scss";

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ariaLabel?: string;
  type?: "text" | "search";
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  onChange,
  placeholder,
  ariaLabel,
  type = "text",
}, ref) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={styles.input}
      ref={ref}
    />
  );
});

Input.displayName = "Input";

export default Input;


