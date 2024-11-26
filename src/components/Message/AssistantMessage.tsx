import React from "react";
import styles from "./AssistantMessage.module.scss";
import AIIcon from "../icons/AIIcon";

export default function AssistantMessage({ content }: { content: string }) {
  return (
    <div className={styles.assistantMessage}>
      <div className={styles.icon}>
        <AIIcon size={18} />
      </div>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
