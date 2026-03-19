// functional component
import MenuLink from "./MenuLink";
import styles from './App.module.scss'
export interface AppProps {
  text: string;
}

export default function App({text}:AppProps) {
  return (
    <div className={styles.movieapp}>
      {text}
      <MenuLink label={'label test'} url={'url test'}/>
    </div>
  );
}
