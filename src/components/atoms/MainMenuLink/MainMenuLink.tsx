import styles from "./MainMenuLink.module.scss";
import { Link } from "react-router";

export type MainMenuLinkProps = {
  label: string;
  url?: string;
  handleMenuToggle: () => void;
};

export default function MainMenuLink({
  label,
  url = "#",
  handleMenuToggle,
}: MainMenuLinkProps) {
  return (
    <Link
      onClick={handleMenuToggle}
      className={styles.link}
      to={url}
      aria-label={label}
    >
      {label}
    </Link>
  );
}
