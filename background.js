// moz-extension://<uuid>/app/<urlencoded_url>
const urlPrefix = browser.runtime.getURL("/app/");
browser.webNavigation.onCommitted.addListener(
/* callback */ function(details) {
  let dst = decodeURIComponent(details.url.substring(urlPrefix.length));
  browser.tabs.remove(details.tabId);
  browser.windows.create({
    type: 'popup',
    url: dst,
  });
}
, /* filter */ { url: [ { urlPrefix: urlPrefix } ], }
);

// Create context menu item
browser.contextMenus.create({
  id: "pop-out-tab",
  title: "Open as web app",
  contexts: ["page", "selection", "link", "image", "video", "audio"]
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId !== "pop-out-tab") return;
  browser.windows.create({
    type: 'popup',
    tabId: tab.id,
  });
});

//// webappmaker.test/<urlencoded_url>
//chrome.webRequest.onBeforeRequest.addListener(
///* callback */ function(req) {
//  let src = URL.parse(req.url);
//  let dst = decodeURIComponent(src.pathname.substring(1))
//  browser.tabs.remove(req.tabId)
//  chrome.windows.create({
//    type: 'popup',
//    url: dst,
//  });
//  return ({ cancel: true });
//}
//, /* filter */ { urls: [ "<all_urls>" ], types: [ "main_frame" ] }
//, /* extraInfoSpec */ [ "blocking" ]
//);
