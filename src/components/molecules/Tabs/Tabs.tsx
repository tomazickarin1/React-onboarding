import styles from "./Tabs.module.scss";
import Tab from "../../atoms/Tab/Tab";

interface TabsProps {
  tabs: Array<{id: number, label: string}>,
  activeTab: number,
  onTabChange: (id: number) => void;
}

export default function Tabs({tabs, activeTab, onTabChange}: TabsProps) {
  return (
    <div className={styles.selectorWrap}>
      {tabs.map((tab) => {
        return <Tab key={tab.id} label={tab.label} isActive={tab.id === activeTab} onClick={() => { onTabChange(tab.id); }} />
      })}
    </div>
  );
}
