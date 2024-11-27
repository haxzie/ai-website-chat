import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "vitest-dom/extend-expect";
import Panel from "../src/pages/Panel";

describe("Button Component", () => {
  it("should render the button with the correct label", () => {
    render(<Panel />);

    // Assert that the panel is rendered with correct screen asking for OpenAI API Key
    const apiScreen = screen.getByTestId("apiInputScreen");
    expect(apiScreen).toBeDefined();

    // Assert that the api key input is rendered
    const apiKeyForm = screen.getByTestId("apiKeyForm");
    expect(apiKeyForm).toBeDefined();

    // Assert that the input is rendered
    const apiKeyInput = screen.getByTestId("apiKeyInput");
    expect(apiKeyInput).toBeDefined();

    // Assert that the save button is rendered
    const apiKeySaveButton =
      screen.getByTestId<HTMLButtonElement>("apiKeySaveButton");
    expect(apiKeySaveButton).toBeDefined();

    // Assert that the button is disabled
    expect(apiKeySaveButton).toBeDisabled();

    // Input a value into the input field
    fireEvent.change(apiKeyInput, { target: { value: "test key" } });
    // Assert that the button is enabled
    expect(apiKeySaveButton).toBeEnabled();
  });

  it("should change screen after API Key is added", () => {
    // Assert that the input is rendered
    const apiKeyInput = screen.getByTestId("apiKeyInput");
    const apiKeySaveButton =
      screen.getByTestId<HTMLButtonElement>("apiKeySaveButton");

    // Input a value into the input field
    fireEvent.change(apiKeyInput, { target: { value: "test key" } });
    // Assert that the button is enabled
    expect(apiKeySaveButton).toBeEnabled();

    // Click the button to see if the screen changes
    fireEvent.click(apiKeySaveButton);
    // Assert that the screen changes
    const modelScreen = screen.getByTestId("chatScreen");
    expect(modelScreen).toBeDefined();
  });

  it("should render the chat screen with chat box and welcome message", () => {
    // Assert that the screen changes and chat box is displayed
    const chatBox = screen.getByTestId("chatBox");
    expect(chatBox).toBeDefined();

    // Assert that the welcome message is displayed
    const welcomeView = screen.getByTestId("welcomeView");
    expect(welcomeView).toBeDefined();
    // confirm the welcome text is displayed
    expect(welcomeView).toHaveTextContent("Ask questions about this website");
  });
});
