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

browser.contextMenus.create({
  id: "clone-pop-out-tab",
  title: "as Copy",
  contexts: ["page", "link"],
});

browser.contextMenus.create({
  id: "move-pop-out-tab",
  title: "Preserve",
  contexts: ["page", "link"],
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  // console.log(browser);
  if (info.menuItemId === "clone-pop-out-tab") {
    browser.windows.create({ type: 'popup', url: tab.url });
  }
  else
  if (info.menuItemId === "move-pop-out-tab") {
    await moveTabAndPreserveEssential(tab);
  }
});

browser.commands.onCommand.addListener(async (command) => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (command === "as_copy") {
    browser.windows.create({ type: 'popup', url: tabs[0].url });
  }
  else
  if (command === "preserve") {
    await moveTabAndPreserveEssential(tabs[0]);
  }
});