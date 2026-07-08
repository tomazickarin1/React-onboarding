import { type ReactNode } from "react";
import NavigationBar from "../../organisms/NavigationBar/NavigationBar";
import Footer from "../../organisms/Footer/Footer";
import styles from "./SingleColumn.module.scss";

type SingleColumnProps = {
  children?: ReactNode;
}

export default function SingleColumn({ children }: SingleColumnProps) {
  return (
    <div className={styles.singleColumnWrapper}>
      <NavigationBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
