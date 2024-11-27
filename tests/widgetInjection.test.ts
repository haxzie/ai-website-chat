/**
 * Tests the widget control functions
 * 1. Inject the chat widget to the current tab
 * 2. Remove the chat widget from the current tab
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { injectChatWidget, removeChatWidget } from "../src/utils/widgetControl";
import { CHAT_WIDGET_ID } from "../src/utils/constants";

// Mock the chrome API
const mockExecuteScript = vi.fn();
const mockQueryTabs = vi.fn();

global.chrome = {
  tabs: {
    query: mockQueryTabs,
  },
  scripting: {
    executeScript: mockExecuteScript,
  },
} as unknown as typeof chrome;

describe("Chat Widget Injections", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset all mocks before each test
  });

  describe("injectChatWidget", () => {
    it("should inject the chat widget into the current tab", async () => {
      // Mock the chrome.tabs.query response
      mockQueryTabs.mockResolvedValue([
        { id: 123, active: true, currentWindow: true },
      ]);

      await injectChatWidget();

      // Verify the tab query was performed
      expect(mockQueryTabs).toHaveBeenCalledWith({
        active: true,
        currentWindow: true,
      });

      // Verify the script execution
      expect(mockExecuteScript).toHaveBeenCalledWith({
        target: { tabId: 123 },
        func: expect.any(Function),
        args: [CHAT_WIDGET_ID],
      });
    });

    it("should not execute script if no active tab is found", async () => {
      mockQueryTabs.mockResolvedValue([]);

      await injectChatWidget();

      // Verify the tab query was performed
      expect(mockQueryTabs).toHaveBeenCalledWith({
        active: true,
        currentWindow: true,
      });

      // Ensure executeScript was not called
      expect(mockExecuteScript).not.toHaveBeenCalled();
    });
  });

  describe("removeChatWidget", () => {
    it("should remove the chat widget from the current tab", async () => {
      // Mock the chrome.tabs.query response
      mockQueryTabs.mockImplementation((_, callback) => {
        callback([{ id: 123, active: true, currentWindow: true }]);
      });

      await removeChatWidget();

      // Verify the tab query was performed
      expect(mockQueryTabs).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Verify the script execution
      expect(mockExecuteScript).toHaveBeenCalledWith({
        target: { tabId: 123 },
        func: expect.any(Function),
        args: [CHAT_WIDGET_ID],
      });
    });

    it("should not execute script if no active tab is found", async () => {
      mockQueryTabs.mockImplementation((_, callback) => {
        callback([]);
      });

      await removeChatWidget();

      // Verify the tab query was performed
      expect(mockQueryTabs).toHaveBeenCalledWith(
        { active: true, currentWindow: true },
        expect.any(Function)
      );

      // Ensure executeScript was not called
      expect(mockExecuteScript).not.toHaveBeenCalled();
    });
  });
});
