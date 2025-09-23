// Get the URL prefix.
const urlPrefix = browser.runtime.getURL("/app/");

browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
  const popoutLink = document.getElementById("popout");
  const linkifyLink = document.getElementById("linkify");

  if (!popoutLink || !linkifyLink) {
    console.error("Elements 'popout' or 'linkify' not found.");
    return; // Exit early if elements are missing
  }

  popoutLink.addEventListener("click", event => {
    event.preventDefault(); // Prevent default link behavior
    browser.windows.create({ type: 'popup', tabId: tabs[0].id })
      .catch(error => {
        console.error("Error creating popup window:", error);
      });
  });



  try {
    // Encode the URL for the 'linkify' link.  Crucial for proper encoding.
    linkifyLink.href = urlPrefix + encodeURIComponent(tabs[0].url);
    linkifyLink.addEventListener("click", event => {
      event.preventDefault();

      navigator.clipboard.writeText(linkifyLink.href)
        .then(() => {
          linkifyLink.querySelector("span").textContent = "☑";
        })
        .catch(err => {
          console.error("Error copying to clipboard:", err);
          linkifyLink.querySelector("span").textContent = "❌";
        });
    });
  } catch (error) {
    console.error("Error updating linkify link:", error);
  }

});