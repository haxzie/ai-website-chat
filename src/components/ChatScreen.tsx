import React, { memo } from "react";
import styles from "./ChatScreen.module.scss";
import ChatMessages from "./ChatMessages";
import ChatBox from "./ChatBox";

function ChatScreen() {
  return (
    <div className={styles.chatScreen}>
      <div className={styles.chatMessages}>
        <ChatMessages />
      </div>
      <div className={styles.chatInputWrapper}>
        <ChatBox />
      </div>
    </div>
  );
}

export default memo(ChatScreen);