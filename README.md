# Chat With URL

Chat With URL is a Chrome extension that leverages large language models (LLMs) to enable users to chat with any website. It provides seamless communication and context-aware interactions with the content of the current webpage.

## Features

- **Interactive Chat Interface**: Engage in natural language conversations with websites.
- **Context-Aware Responses**: The extension uses the content of the current page to provide accurate and relevant responses.
- **Customizable Settings**: Configure preferences for your chat experience.
- **Modern UI**: Built with React and Vite for a responsive and sleek interface.
- **LLM Integration**: Powered by AI SDKs to deliver intelligent and contextual interactions.

---

## File Structure

The project is organized as follows:

```
src
├── assets
│   └── styles        # Contains global styles and fonts
│       ├── fonts
│       │   ├── Borel
│       │   └── inter
│       └── setup     # Initial style configurations
├── components         # Reusable React components
│   ├── Message        # Chat message component
│   ├── Settings       # Settings panel
│   └── icons          # Custom icons
├── hooks              # Custom React hooks
├── layouts            # Page layouts
├── pages              # Extension pages (popup, widget, etc.)
├── store              # State management (Zustand)
└── utils              # Utility functions
tests                  # All the tests
```

---

## Development

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/chat-with-url.git
   cd chat-with-url
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Scripts

- **Start Development Server**:
  ```bash
  npm run dev
  ```
  Launches a development server for building the extension. This will also open up a chrome instance with the plugin already installed.

- **Build for Production**:
  ```bash
  npm run build
  ```
  Compiles TypeScript and bundles the extension for production.

- **Export as ZIP**:
  ```bash
  npm run zip
  ```
  Packages the extension into a `.zip` file for deployment.

---

### Testing
- **Create a build**
  ```bash
  npm run build
  ```
  Compiles TypeScript and bundles the extension for production.
- **Run Vitest**
  ```bash
  npm run test
  ```
  Runs vitest test runner

## Usage

1. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" and click "Load unpacked."
   - Select the `dist` directory generated by the `npm run build` command.

2. Interact with any website:
   - Open the extension by clicking its icon in the browser toolbar.
   - Start chatting with the website content.

---

## Built With

- **React**: For the user interface.
- **Vite**: Fast and modern build tool.
- **Zustand**: For state management.
- **AI SDK**: For LLM integration.
- **TypeScript**: Ensures type safety and maintainability.
- **SASS**: For styling.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
