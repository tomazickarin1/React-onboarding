import styles from "./MainMenuLink.module.scss";

export interface MainMenuLinkProps {
  label: string;
  url?: string;
}

export default function MainMenuLink({ label, url = "#" }: MainMenuLinkProps) {
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
