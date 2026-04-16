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

  const [isOpen, setIsOpen] = useState(false);

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

  // const handleOpen = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleSelect = (id: number) => {
  //   onTabChange(id);
  //    setIsOpen(false);
  // }

  return (
    <>
      <div className={styles.mobileDropdown}>
        {isOpen && (
          <ul className={styles.mobileDropdownList} role="listbox">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                role="option"
                aria-selected={tab.id === activeTab}
                onClick={() => {
                  onTabChange(tab.id);
                  setIsOpen(false);
                }}
              >
                {tab.id === activeTab ? (
                  <button
                    type="button"
                    className={styles.mobileDropdownTrigger}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                  >
                    {tab.label} <span className={styles.iconDown}></span>
                  </button>
                ) : (
                  tab.label
                )}
              </li>
            ))}
          </ul>
        )}

        {!isOpen && (
          <button
            type="button"
            className={styles.mobileDropdownTrigger}
            onClick={() => {
              setIsOpen(true);
            }}
            aria-haspopup="listbox"
          >
            {tabs.find((tab) => tab.id === activeTab)?.label}
            <span className={styles.iconDown}></span>
          </button>
        )}
      </div>

      {/* <div
        className={styles.mobileDropdown}
        role="listbox"
        aria-label="select category"
      >
        <button
          type="button"
          className={styles.mobileDropdownTrigger}
          onClick={handleOpen}
          aria-haspopup="listbox"
        >
          {tabs.find((tab) => tab.id === activeTab)?.label}
          <span className={styles.iconDown}></span>
        </button>

        {isOpen && (
          <ul className={styles.dropdownWrapper}>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                role="option"
                aria-selected={tab.id === activeTab}
                className={tab.id === activeTab ? styles.activeOption : ""}
                onClick={() => {handleSelect(tab.id)}}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        )}
      </div> */}

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
