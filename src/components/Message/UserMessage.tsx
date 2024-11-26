import React from "react";
import styles from "./UserMessage.module.scss";

export default function UserMessage({ content }: { content: string }) {
  return <p className={styles.userMessage}>{content}</p>;
}
