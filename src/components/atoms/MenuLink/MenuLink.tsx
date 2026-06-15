import styles from "./MenuLink.module.scss";
import { Link } from "react-router";

export interface MenuLinkProps {
  label: string;
  url: string;
}

export default function MenuLink({ label, url }: MenuLinkProps) {
  return (
    <Link className={styles.link} to={url}>
      {label}
    </Link>
  );
}
