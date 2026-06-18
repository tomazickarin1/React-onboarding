import styles from "./Tab.module.scss";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      data-tab
      className={`${styles.selector ?? ""} ${isActive ? (styles.active ?? "") : ""}`}
      onClick={onClick}
    >
      <h3>{label}</h3>
    </button>
  );
}
