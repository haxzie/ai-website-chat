import React, { memo, useCallback, useState } from "react";
import styles from "./ChatBox.module.scss";
import EnterIcon from "./icons/EnterIcon";
import useChat from "../hooks/useChat";
import useChatStore from "../store/Chat.store";

/**
 * ChatBox component
 * Renders a chat input box and a send button to send messages
 * @param props
 * @returns
 */
function ChatBox() {
  const { sendMessage } = useChat();

  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isAIReplying, setIsAIReplying] = useState(false);
  const [error, setError] = useState("");
  /**
   * Handle the form submission
   */
  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Prevent sending empty messages
      if (!message.trim()) return;
      // Send the message
      setMessage("");

      try {
        setIsAIReplying(true);
        setError(""); // clear the error, so users can try again
        await sendMessage(message);
      } catch (error) {
        console.error(error);
        // clear all the messages
        useChatStore.getState().clearMessages();
        setError("An error occurred while sending the message");
      } finally {
        setIsAIReplying(false);
      }
    },
    [message]
  );

  return (
    <form
      className={[
        styles.ChatBox,
        isFocused && styles.focused,
        error && styles.error,
      ].join(" ")}
      onSubmit={handleOnSubmit}
    >
      <input
        className={styles.ChatBoxInput}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={error || "Ask a question about this website"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isAIReplying}
        autoFocus
      />
      <button
        className={[styles.sendButton, message && styles.active].join(" ")}
      >
        <EnterIcon size={18} />
      </button>
    </form>
  );
}

export default memo(ChatBox);