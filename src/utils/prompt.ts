import { Readability } from "@mozilla/readability";
/**
 * Gets the current page context as markdown
 */
export async function getPageContext(): Promise<string> {
  const chromeTab = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  // get the current tab
  const tab = chromeTab[0];
  const tabId = tab.id as number;
  const currentURL = tab.url as string;
  let pageContext = "";

  // get the current tab content
  const [tabContent] = await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    func: () => {
      const main = document.querySelector("main");
      return {
        doc: document.documentElement.outerHTML,
        text: main ? main.innerText : "",
      };
    },
  });

  const { doc, text } = tabContent.result as { doc: string; text: string };

  if (text) {
    // raw dogging the text content
    pageContext = text || "";
  } else {
    // get the article content using the Mozilla Readability library
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(doc.toString(), "text/html");
    const article = new Readability(parsedDoc).parse();
    if (article && article.textContent) {
      const { title, lang, textContent, excerpt, siteName } = article;

      pageContext = `Title: ${title}
      Site: ${siteName}
      Language: ${lang}
      Excerpt: ${excerpt}
      Content: ${textContent}
      `;
    } else {
      throw new Error("Could not extract page content");
    }
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
