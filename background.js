// moz-extension://<uuid>/app/<urlencoded_url>
const urlPrefix = browser.runtime.getURL("/app/");

// Listener for navigation changes. Opens in popup if URL matches the prefix.
browser.webNavigation.onCommitted.addListener(details => {
  if (details.url.startsWith(urlPrefix)) {
    const decodedURL = decodeURIComponent(details.url.substring(urlPrefix.length));
    try {
      browser.tabs.remove(details.tabId);
      browser.windows.create({ type: 'popup', url: decodedURL });
    } catch (error) {
      console.error("Error opening popup window:", error); // Error handling
    }
  }
}, { url: [{ urlPrefix }] });


// Create context menu item.
browser.contextMenus.create({
  id: "pop-out-tab",
  title: "Open as web app",
  contexts: ["page", "link"] // Limited to more relevant contexts
});


// Handle context menu clicks. Opens the current URL in a popup window.
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "pop-out-tab") {
    browser.windows.create({ type: 'popup', url: tab.url });
  }
});