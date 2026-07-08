import { type ReactNode } from "react";
import NavigationBar from "../../organisms/NavigationBar/NavigationBar";
import Footer from "../../organisms/Footer/Footer";
import styles from "./TwoColumn.module.scss";

type TwoColumnProps = {
  main: ReactNode;
  sidebar: ReactNode;
}

export default function TwoColumn({ main, sidebar }: TwoColumnProps) {
  return (
    <div className={styles.twoColumnWrapper}>
      <NavigationBar />
      <div className={styles.content}>
        <main>{main}</main>
        <aside>{sidebar}</aside>
      </div>
      <Footer />
    </div>
  );
}
