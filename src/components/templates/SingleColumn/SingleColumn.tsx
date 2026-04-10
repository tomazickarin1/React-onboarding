import { type ReactNode } from "react";
import NavigationBar from "../../organisms/NavigationBar/NavigationBar";
import Footer from "../../organisms/Footer/Footer";

interface SingleColumnProps {
  children?: ReactNode;
}

export default function SingleColumn({ children }: SingleColumnProps) {
  return (
    <>
      <NavigationBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
