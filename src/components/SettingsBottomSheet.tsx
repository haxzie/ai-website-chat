import React, { useRef, useEffect, MouseEvent } from "react";
import styles from "./SettingsBottomSheet.module.scss";
import APIKeyForm from "./Settings/APIKeyForm";
import ClearIcon from "./icons/ClearIcon";

export default function SettingsBottomSheet({
  onClose,
}: {
  onClose: () => void;
}) {
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  /**
   * Handle click outside of the bottom sheet
   * @param e MouseEvent
   */
  const onClickOutside = (e: MouseEvent) => {
    if (bottomSheetRef.current && e.target === bottomSheetRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    // add escape listener
    const escapeListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", escapeListener);

    return () => {
      document.removeEventListener("keydown", escapeListener);
    };
  }, []);

  return (
    <div
      className={styles.bottomSheet}
      ref={bottomSheetRef}
      onClick={onClickOutside}
    >
      <div className={styles.sheet}>
        <div className={styles.header}>
          <h2>Settings</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <ClearIcon size={24} />
          </button>
        </div>
        <div className={styles.content}>
          <APIKeyForm onKeyChange={onClose}/>
        </div>
      </div>
    </div>
  );
}
