# Web App Maker (WAM)

This extension allows you to open websites in a dedicated popup window, effectively creating a simplified Progressive Web App (PWA) or Site Specific Browser (SSB) experience. No browser chrome, just the content of the page.

**Features:**

* **Open websites in a new popup:** Avoid the browser's default UI.
* **Context menu & Shortcut integration:** Open apps via right-click or keyboard shortcuts with two different behaviors (Preserve or Copy).
* **CLI / Terminal Integration:** Launch websites directly from your terminal or desktop environment using a custom protocol handler (`ext+wam:`).
* **Container Support:** Open terminal-launched web apps isolated inside specific Firefox containers.
* **Robust URL Handling:** Includes error handling and a visual fallback UI if a requested container does not exist.

**How to Use:**

### From the Browser (UI)

1. **Install the extension.**
2. **Right-click on a page/link** (or use the keyboard shortcuts) and select your preferred mode:
   * **Preserve Mode:** Opens the current tab in a popup (moves the existing tab).
     * **Shortcut:** `Alt+P`
   * **Copy Mode:** Opens a clone of the tab in a popup, leaving the original tab intact.
     * **Shortcut:** `Alt+K`

### From the Terminal (CLI)

You can launch web apps directly from your terminal, scripts, or window manager using the custom protocol.
Launch a standard web app:

```bash
firefox "ext+wam:https://github.com" # this open the default container
```

Launch a web app inside a specific container (separate the container name and the URL with a `|`):

```bash
firefox "ext+wam:Work|https://github.com"  # this open the Work container if exists
```

**Known Issues/Limitations:**

* Currently, the extension only opens the target URL in a popup. Further development may support more complex features such as app-like behavior (e.g., offline capabilities).

**Development Notes:**

* Uses `browser.webNavigation.onCommitted` to intercept navigation and handle specific URLs.
* Uses `browser.contextMenus` and the `commands` API for a user-friendly way to trigger the popup via mouse or keyboard.
* Implements `protocol_handlers` to capture terminal commands and route them internally.
* Utilizes `browser.contextualIdentities` to assign popups to specific Firefox containers.
* Includes error handling to gracefully manage potential issues during the popup creation process.

**License:** MIT
