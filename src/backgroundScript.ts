chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  const isIssueBoard = /https:\/\/github.com\/.*\/(issues)$/.test(details.url);
  const isPREndPage = /https:\/\/github.com\/.*\/(pull)\/\d+$/.test(
    details.url
  );

  if (isIssueBoard || isPREndPage) {
    chrome.tabs.executeScript({
      file: "dist/contentScript.bundle.js"
    });
  }
});
