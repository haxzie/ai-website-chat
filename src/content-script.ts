import { CHAT_WIDGET_ID } from "./utils/constants";

export function setupChatWidget() {
  // Create the iframe
  const iframe = document.createElement("iframe");
  iframe.id = CHAT_WIDGET_ID;
  iframe.draggable = true; // set draggable to true
  iframe.style.display = "none";
  iframe.style.position = "fixed";
  iframe.style.bottom = "10px";
  iframe.style.right = "10px";
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.backgroundColor = "#5d6573";
  iframe.style.borderRadius = "10px";
  iframe.style.paddingTop = "10px"; // Add padding top to the iframe
  iframe.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)"; // Add box shadow to the iframe

  // Add the iframe to the document
  document.body.appendChild(iframe);

  // Dragging logic
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  iframe.addEventListener("mouseenter", (e) => {
    iframe.style.backgroundColor = "#687ea3"; // Change border color on hover
  });

  iframe.addEventListener("mouseleave", (e) => {
    iframe.style.backgroundColor = "#5d6573"; // Change border color on hover
  });
  // Mouse down event to start dragging
  iframe.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - iframe.offsetLeft;
    offsetY = e.clientY - iframe.offsetTop;
    iframe.style.cursor = "grabbing";
    iframe.style.pointerEvents = "none"; // Disable pointer events to prevent conflict
  });

  // Mouse move event to drag the iframe
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      // Use requestAnimationFrame to prevent jank
      requestAnimationFrame(() => {
        iframe.style.left = `${newX}px`;
        iframe.style.top = `${newY}px`;
        iframe.style.bottom = ""; // Reset bottom property to prevent conflict
        iframe.style.right = ""; // Reset right property to prevent conflict
      });
    }
  });

  // Mouse up event to stop dragging
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      iframe.style.cursor = "grab";
      iframe.style.pointerEvents = "auto"; // Enable pointer events back
    }
  });
}


setupChatWidget();