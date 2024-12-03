chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "open_sidebar") {
      chrome.sidePanel.setOptions(
          {
              path: "index.html",
              enabled: true,
          },
          () => {
              if (chrome.runtime.lastError) {
                  console.error("Error opening sidebar:", chrome.runtime.lastError.message);
              } else {
                  console.log("Sidebar successfully opened");
              }
            }
      );
      sendResponse({ status: "Sidebar opened" });
  }
});
