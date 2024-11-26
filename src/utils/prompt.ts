import { Readability } from "@mozilla/readability";
/**
 * Gets the current page context as markdown
 */
async function getPageContext(): Promise<string> {
  const chromeTab = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  // get the current tab
  const tab = chromeTab[0];
  const tabId = tab.id as number;

  // get the current tab content
  const [tabContent] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => document.documentElement.outerHTML.toString(),
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(
    tabContent.result?.toString() || "",
    "text/html"
  );

  const currentURL = tab.url as string;

  let pageContext = "";
  // get the article content using the Mozilla Readability library

  const article = new Readability(doc).parse();

  if (article) {
    const { title, lang, textContent, excerpt, siteName } = article;

    pageContext = `Title: ${title}
    Site: ${siteName}
    Language: ${lang}
    Excerpt: ${excerpt}
    Content: ${textContent}
    `;
  } else {
    const pageContent = doc.querySelector("body") as HTMLElement;
    // remove all styles
    pageContent.querySelectorAll("style").forEach((style) => style.remove());
    // remove all img tags
    pageContent.querySelectorAll("img").forEach((img) => img.remove());
    // remove all the video tags
    pageContent.querySelectorAll("video").forEach((video) => video.remove());
    // remove all script tags
    pageContent.querySelectorAll("script").forEach((script) => script.remove());
    // remove all nav tags
    pageContent.querySelectorAll("nav").forEach((nav) => nav.remove());
    // remove all footer tags
    pageContent.querySelectorAll("footer").forEach((footer) => footer.remove());
    // Remove the widget <iframe> by ID
    const iframe: Element | null = pageContent.querySelector(
      "iframe#chat-with-url-widget"
    );
    if (iframe) {
      iframe.remove();
    }

    // raw dogging the text content
    pageContext = pageContent.textContent || "";
  }

  return `Current URL: ${currentURL}

  ${pageContext}
`;
}

/**
 * Generates a prompt for the AI model while injecting the current page context
 */
export async function generateSystemPrompt() {
  try {
    const pageContext = await getPageContext();
    return `You are an advanced AI assistant that can help users with questions about the current page.
    You are given the content of the web page user is currently viewing. 
    You are expected to provide helpful responses to user queries based on the content of the page.
    You can respond to the user with markdown formatted text.
    
    <Content>
    ${pageContext}
    </Content>
    `;
  } catch (error) {
    // if we can't get the page context, let the user know via the prompt
    return `You are an advanced AI assistant that can help users with questions about the current page.
   
    The current page user is viewing could not be loaded because of some error.
    Reply with a helpful response to the user indicating that we couldn't support this page content.
    `;
  }
}
