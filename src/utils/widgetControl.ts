import { CHAT_WIDGET_ID } from "./constants";

/**
 * Inject the chat widget to the current tab
 */
export const injectChatWidget = async () => {
  // get the current document from browser tab
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  if (currentTab && currentTab.id) {
    // inject the script to the current tab
    chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: (widgetId) => {
        // Create the iframe
        const iframe = document.getElementById(widgetId) as HTMLIFrameElement;
        iframe.src = chrome.runtime.getURL("src/widget.html"); // Load the chat page

        iframe.id = widgetId;
        iframe.style.position = "fixed";
        iframe.style.bottom = "10px";
        iframe.style.right = "10px";
        iframe.style.width = "400px";
        iframe.style.height = "600px";
        iframe.style.border = "none";
        iframe.style.zIndex = "9999";
        // iframe.style.backgroundColor = "transparent";
        iframe.style.borderRadius = "10px";
        iframe.style.display = "block";

        // Add the iframe to the document
        // document.body.appendChild(iframe);
      },
      args: [CHAT_WIDGET_ID],
    });
  }
};

/**
 * Remove the chat widget from the current tab
 */
export const removeChatWidget = async () => {
  // get the current document from browser tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    if (currentTab && currentTab.id) {
      // remove the iframe from the current tab
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        func: (widgetId) => {
          const iframe = document.getElementById(widgetId);
          if (iframe) {
            iframe.style.display = "none";
          }
        },
        args: [CHAT_WIDGET_ID],
      });
    }
  });
};
