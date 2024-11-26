import React, { memo, useMemo } from "react";
import styles from "./ChatMessages.module.scss";
import WelcomeView from "./WelcomeView";
import { useShallow } from "zustand/react/shallow";
import useChatStore from "../store/Chat.store";
import MessageView from "./Message/MessageView";

function ChatMessages() {
  const { messages } = useChatStore(
    useShallow(({ messages }) => ({ messages }))
  );

  const messagesArray = useMemo(() => Object.values(messages), [messages]);

  return messagesArray.length === 0 ? (
    <WelcomeView />
  ) : (
    <div className={styles.chatMessages}>
      {messagesArray.map((message, index) => (
        <MessageView
          key={`message-${message.role}-${index}`}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
}

export default memo(ChatMessages);
