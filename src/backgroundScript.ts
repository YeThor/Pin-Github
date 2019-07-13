chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  const isIssueBoard = /https:\/\/github.com\/.*\/(issues)$/.test(details.url);

  if (isIssueBoard) {
    console.log("IssueBoard!!");
    chrome.tabs.executeScript({
      file: "dist/contentScript.bundle.js"
    });
  }
});
