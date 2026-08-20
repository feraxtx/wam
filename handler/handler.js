const urlParams = new URLSearchParams(window.location.search);
const rawQuery = urlParams.get("q");

if (rawQuery && rawQuery.startsWith("ext+wam:")) {
  let payload = rawQuery.replace("ext+wam:", "");
  payload = decodeURIComponent(payload);

  let targetUrl = payload;
  let containerName = null;

  const separatorIndex = payload.indexOf("|");
  if (separatorIndex !== -1 && !payload.startsWith("http")) {
    containerName = payload.substring(0, separatorIndex);
    targetUrl = payload.substring(separatorIndex + 1);
  }

  async function launchApp() {
    let storeId = undefined;

    if (containerName) {
      const containers = await browser.contextualIdentities.query({
        name: containerName,
      });
      if (containers && containers.length > 0) {
        storeId = containers[0].cookieStoreId;
      } else {
        renderContainerList(await browser.contextualIdentities.query({}) );
        throw new Error(`Container "${containerName}" not found.`);
      }
    }

    const newTab = await browser.tabs.create({
      url: targetUrl,
      cookieStoreId: storeId,
      active: false,
    });

    await browser.windows.create({
      tabId: newTab.id,
      type: "popup",
    });

    // Close the handler routing tab only if everything succeeds
    return await browser.tabs.getCurrent();
  }

  function renderContainerList(containers) {
    const listContainer = document.getElementById("available-containers");
    listContainer.innerHTML = `<span style="color: var(--fg-color);">Available containers (Click to copy):</span>`;

    containers.forEach((c) => {
      const item = document.createElement("div");
      item.className = "container-item";

      item.style.setProperty("--ctx-color", `var(--cat-${c.color})`);
      item.style.setProperty("--icon-url", `url("${c.iconUrl}")`);
      
      item.innerHTML = `
        <div class="container-icon"></div>
        <span class="container-name">${c.name}</span>
      `;

      // Copy to clipboard logic
      item.onclick = async () => {
        await navigator.clipboard.writeText(c.name);
        const nameSpan = item.querySelector(".container-name");
        const originalName = nameSpan.textContent;
        nameSpan.textContent = "✓ Copied!";
        setTimeout(() => { nameSpan.textContent = originalName; }, 1000);
      };

      listContainer.appendChild(item);
    });
  }
  // Execute and catch any errors (like missing permissions or wrong URLs)
  launchApp()
    .then((tab) => { browser.tabs.remove(tab.id); })
    .catch((error) => {
      document.title = "[wam] error";
      console.error("Launcher error:", error);
      const errorContainer = document.getElementById("error-container");
      if (errorContainer) {
        errorContainer.style.display = "block";
        errorContainer.textContent = `Failed to launch: ${error.message}`;
      }
    });
}
