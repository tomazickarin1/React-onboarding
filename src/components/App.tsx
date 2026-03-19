// functional component
import MenuLinkList from "./MenuLinkList";
import styles from './App.module.scss'

const links = [
  { label: "Home", url: "/home" },
  { label: "About", url: "/about" },
  { label: "Contact", url: "/contact" }
]

export interface AppProps {
  text: string;
}

export default function App({text}:AppProps) {
  return (
    <div className={styles.movieapp}>
      {text}
      <MenuLinkList links={links} ></MenuLinkList>
    </div>
  );
}
