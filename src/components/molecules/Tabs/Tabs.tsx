import styles from "./Tabs.module.scss";
import Tab from "../../atoms/Tab/Tab";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   onTabChange(Number(e.target.value));
  // };

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
                tabIndex={0}
                className={tab.id === activeTab ? styles.activeOption : ""}
                aria-selected={tab.id === activeTab}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onTabChange(tab.id);
                    setIsOpen(false);
                  }
                }}
                onClick={() => {
                  onTabChange(tab.id);
                  setIsOpen(false);
                }}
              >
                {tab.id === activeTab ? (
                  <div className={styles.activeBtnWrapper}>
                    <button
                      type="button"
                      className={styles.mobileDropdownTrigger}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                      }}
                    >
                      {tab.label}{" "}
                      <span className={styles.iconDown}>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    </button>
                  </div>
                ) : (
                  tab.label
                )}
              </li>
            ))}
          </ul>
        )}

        {!isOpen && (
          <div className={styles.activeBtnWrapper}>
            <button
              type="button"
              className={styles.mobileDropdownTrigger}
              onClick={() => {
                setIsOpen(true);
              }}
              aria-haspopup="listbox"
            >
              {tabs.find((tab) => tab.id === activeTab)?.label}
              <span className={styles.iconDown}>
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </button>
          </div>
        )}
      </div>

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
