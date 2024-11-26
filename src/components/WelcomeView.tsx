import React from "react";
import styles from "./WelcomeView.module.scss";
import AIIcon from "./icons/AIIcon";

export default function WelcomeView() {
  return (
    <div className={styles.welcomeView}>
      <div className={styles.icon}>
        <AIIcon size={34} />
      </div>
      <div className={styles.texts}>
        <h2>Ask questions about this website</h2>
        <p>I'll be able to answer anything about this website's content.</p>
      </div>
    </div>
  );
}
