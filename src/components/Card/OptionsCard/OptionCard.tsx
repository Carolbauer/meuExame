import React from "react";
import styles from "./OptionCard.module.css";

interface OptionCardProps {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  label,
  icon,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <div className={styles.content}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.label}>{label}</div>
      </div>
      <input
        type="checkbox"
        checked={selected}
        readOnly
        className={styles.checkbox}
      />
    </div>
  );
};
