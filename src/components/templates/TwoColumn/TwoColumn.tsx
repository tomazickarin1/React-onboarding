import { type ReactNode } from "react";
import NavigationBar from "../../organisms/NavigationBar/NavigationBar";
import Footer from "../../organisms/Footer/Footer";

type TwoColumnProps = {
  main: ReactNode;
  sidebar: ReactNode;
}

export default function TwoColumn({ main, sidebar }: TwoColumnProps) {
  return (
    <>
      <NavigationBar />
      <div>
        <main>{main}</main>
        <aside>{sidebar}</aside>
      </div>
      <Footer />
    </>
  );
}
