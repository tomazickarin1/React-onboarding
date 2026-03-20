import styles from "./MenuLinkList.module.scss";
import MenuLink from "./MenuLink";

export interface MenuLinkListProps {
  links: Array<{ label: string; url: string }>;
}

export default function MenuLinkList({ links }: MenuLinkListProps) {
  return (
    <div className={styles.menuWrapper}>
      <ul className={styles.menu}>
        {links.map((link) => (
          <li key={link.label}>
            <MenuLink label={link.label} url={link.url}></MenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
