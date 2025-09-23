# Web App Maker (WAM)

This extension allows you to open websites in a dedicated popup window, effectively creating a simplified Progressive Web App (PWA) or Site Specific Browser (SSB) experience.  No browser chrome, just the content of the page.

**Features:**

* **Open websites in a new popup:**  Avoid the browser's default UI.
* **Context menu integration:**  Right-click on a page or link and select "Open as web app" to open it in a popup.
* **Robust URL Handling:** Uses a prefix for the URL to ensure that URLs are opened in a dedicated popup window. Includes error handling for potential issues.


**How to Use:**

1. **Install the extension.**
2. **Right-click on a page or link:** Select "Open as web app".
3.  A new popup window will open displaying the content of the selected site.


**Known Issues/Limitations:**

* Currently, the extension only opens the target URL in a popup.  Further development may support more complex features such as app-like behavior (e.g., offline capabilities).


**Development Notes:**

* Uses `browser.webNavigation.onCommitted` to intercept navigation and handle specific URLs.
* Uses `browser.contextMenus` for a user-friendly way to trigger the popup.
* Includes error handling to gracefully manage potential issues during the popup creation process.


**License:** MIT
