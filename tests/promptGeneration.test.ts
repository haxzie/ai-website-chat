import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPageContext } from "../src/utils/prompt";

// Mock the `chrome` API
const mockQueryTabs = vi.fn();
const mockExecuteScript = vi.fn();

global.chrome = {
  tabs: {
    query: mockQueryTabs,
  },
  scripting: {
    executeScript: mockExecuteScript,
  },
} as unknown as typeof chrome;

describe("Page Context", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getPageContext", () => {
    it("should return article content when main text does not exist", async () => {
      // Mock active tab query
      mockQueryTabs.mockResolvedValue([
        { id: 123, active: true, currentWindow: true, url: "https://example.com" },
      ]);

      // Mock script execution to return document without main text
      mockExecuteScript.mockResolvedValue([
        {
          result: {
            doc: `
              <html>
                <body>
                  <article>
                    <h1>Sample Article</h1>
                    <p>This is a sample article content.</p>
                  </article>
                </body>
              </html>
            `,
            text: "",
          },
        },
      ]);

      const result = await getPageContext();
      expect(result).toContain("Current URL: https://example.com");
      expect(result).toContain("Sample Article");
      expect(result).toContain("This is a sample article content.");
    });
  });
});
