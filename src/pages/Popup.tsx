import React, { useCallback } from "react";
import styles from "./Popup.module.scss";
import AIIcon from "../components/icons/AIIcon";
import { injectChatWidget } from "../utils/widgetControl";

export default function Popup() {
  const injectScript = useCallback(() => {
    injectChatWidget();
    window.close();
  }, []);

  return (
    <div className={styles.popup}>
      <div className={styles.icon}>
        <AIIcon />
      </div>
      <div className={styles.texts}>
        <h2>Chat with this website</h2>
        <p>Quickly as questions and let AI answer your queries</p>
      </div>
      <button className={styles.cta} onClick={injectScript}>
        Chat With Website
      </button>
    </div>
  );
}
