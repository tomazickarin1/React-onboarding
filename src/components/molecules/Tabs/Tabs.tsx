import styles from "./Tabs.module.scss";
import Tab from "../../atoms/Tab/Tab";
import { useRef, useEffect, useState } from "react";

interface TabsProps {
  tabs: Array<{ id: number; label: string }>;
  activeTab: number;
  onTabChange: (id: number) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!wrapperRef.current) return;
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const tabElements = wrapperRef.current.querySelectorAll("[data-tab]");
    const activeElement = tabElements[activeIndex] as HTMLElement;

    setSliderStyle({
      left: activeElement.offsetLeft,
      width: activeElement.offsetWidth,
    });

  }, [activeTab, tabs]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTabChange(Number(e.target.value));
  };

  return (
    <>
      <select
        value={activeTab}
        onChange={handleSelectChange}
        className={styles.mobileSelect}
      >
        {tabs.map((tab) => {
          return (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          );
        })}
      </select>

      <div className={styles.selectorWrap} ref={wrapperRef}>
        <div
          className={styles.slider}
          style={{ left: sliderStyle.left, width: sliderStyle.width }}
        ></div>
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.id}
              label={tab.label}
              isActive={tab.id === activeTab}
              onClick={() => {
                onTabChange(tab.id);
              }}
            />
          );
        })}
      </div>
    </>
  );
}
