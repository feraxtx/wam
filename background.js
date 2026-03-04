browser.contextMenus.create({
  id: "clone-pop-out-tab",
  title: "Duplicate",
  contexts: ["page", "link"],
});

browser.contextMenus.create({
  id: "move-pop-out-tab",
  title: "Preserve",
  contexts: ["page", "link"],
});


browser.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log(browser);
  if (info.menuItemId === "clone-pop-out-tab") {
    browser.windows.create({ type: 'popup', url: tab.url });
  }
  else
  if (info.menuItemId === "move-pop-out-tab") {
    await moveTabAndPreserveEssential(tab);
  }
});

async function moveTabAndPreserveEssential(originalTab) {
  await browser.windows.create({ tabId: originalTab.id, type: 'popup' });
  if (!originalTab.pinned) return;
  browser.tabs.create({
    windowId: originalTab.windowId,
    index: originalTab.index + 1,
    url: originalTab.url,
    pinned: originalTab.pinned,
    active: false
  }).then((tab) => {
    tab.favicon = originalTab.favicon
    browser.tabs.discard(tab.id)
  })
}
