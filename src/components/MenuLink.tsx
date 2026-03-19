import styles from "./MenuLink.module.scss";

export interface MenuLinkProps {
  label: string;
  url: string;
}

export default function MenuLink({ label, url }: MenuLinkProps) {
  return (
    <a
      className={styles.link}
      aria-label={label}
      href={url}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {label}
    </a>
  );
}
