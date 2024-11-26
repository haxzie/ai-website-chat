import useChatStore from "../store/Chat.store";
import { useShallow } from "zustand/react/shallow";
import APIKeyInputScreen from "../components/Settings/APIKeyInputScreen";
import ChatScreen from "../components/ChatScreen";
import PanelLayout from "../layouts/PanelLayout";

export default function () {
  const { apiKey } = useChatStore(useShallow(({ apiKey }) => ({ apiKey })));
  return (
    <PanelLayout>
      {!apiKey ? <APIKeyInputScreen /> : <ChatScreen />}
    </PanelLayout>
  );
}
