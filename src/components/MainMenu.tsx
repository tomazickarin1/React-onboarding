import MainMenuItem from "./MainMenuItem";
import {menuItems} from "../data/menuItems";
console.log(menuItems);

export default function MainMenu() {
  return (
    <div>
      {menuItems.map((item) => (
        <MainMenuItem key={item.id} label={item.label} links={item.links} />
      ))}
    </div>
  );
}
