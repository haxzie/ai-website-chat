import React, { useCallback, useState } from "react";
import styles from "./PanelLayout.module.scss";
import TopBar from "../components/TopBar";
import SettingsBottomSheet from "../components/SettingsBottomSheet";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, []);

  return (
    <div className={styles.layout}>
      <TopBar onClickShowSettings={toggleSettings} />
      <main className={styles.content}>{children}</main>
      {showSettings && <SettingsBottomSheet onClose={toggleSettings} />}
    </div>
  );
}
