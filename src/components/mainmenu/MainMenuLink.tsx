import styles from "./MainMenuLink.module.scss";

export interface MainMenuLinkProps {
  label: string;
  url?: string;
  handleMenuToggle: () => void;
}

export default function MainMenuLink({
  label,
  url = "#",
  handleMenuToggle,
}: MainMenuLinkProps) {
  return (
    <li
      className={styles.listItem}
      onClick={(e) => {
        e.preventDefault();
        handleMenuToggle();
      }}
    >
      <a className={styles.link} aria-label={label} href={url}>
        {label}
      </a>
    </li>
  );
}
