import styles from "./MainMenuLink.module.scss";

export interface MainMenuLinkProps {
  label: string;
  url?: string;
  handleMenuToggle: () => void;
}

export default function MainMenuLink({ label, url = "#", handleMenuToggle }: MainMenuLinkProps) {
  return (
    <a
      className={styles.link}
      aria-label={label}
      href={url}
      onClick={(e) => {
        e.preventDefault();
        handleMenuToggle()
      }}
    >
      {label}
    </a>
  );
}
