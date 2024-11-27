import { describe, it, expect, beforeEach } from "vitest";
import { setupChatWidget } from "../src/content-script";
import { CHAT_WIDGET_ID } from "../src/utils/constants";

function rgbToHex(rgb: string): string {
  const result = rgb
    .match(/\d+/g)
    ?.slice(0, 3)
    .map((num) => parseInt(num).toString(16).padStart(2, "0"))
    .join("");
  return result ? `#${result}` : rgb;
}

describe("setupChatWidget", () => {
  beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = "";
  });

  it("should create and append the iframe to the document body", () => {
    setupChatWidget();

    const iframe = document.getElementById(CHAT_WIDGET_ID) as HTMLIFrameElement;
    expect(iframe).toBeTruthy();
    expect(iframe.style.position).toBe("fixed");
    expect(iframe.style.bottom).toBe("10px");
    expect(iframe.style.right).toBe("10px");
    expect(iframe.style.width).toBe("400px");
    expect(iframe.style.height).toBe("600px");
    expect(iframe.style.display).toBe("none");
    expect(rgbToHex(iframe.style.backgroundColor)).toBe("#5d6573");
    expect(iframe.draggable).toBe(true);
  });

  it("should change background color on mouseenter and mouseleave", () => {
    setupChatWidget();

    const iframe = document.getElementById(CHAT_WIDGET_ID) as HTMLIFrameElement;

    // Trigger mouseenter
    const mouseEnterEvent = new Event("mouseenter");
    iframe.dispatchEvent(mouseEnterEvent);
    expect(rgbToHex(iframe.style.backgroundColor)).toBe("#687ea3");

    // Trigger mouseleave
    const mouseLeaveEvent = new Event("mouseleave");
    iframe.dispatchEvent(mouseLeaveEvent);
    expect(rgbToHex(iframe.style.backgroundColor)).toBe("#5d6573");
  });

  // Add more tests here for drag functionality
});
