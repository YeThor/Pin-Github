chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  const isIssueBoard = /https:\/\/github.com\/.*\/(issues)$/.test(details.url);
  const isPREndPage = /https:\/\/github.com\/.*\/(pull)\/\d+$/.test(
    details.url
  );

  if (isIssueBoard || isPREndPage) {
    console.log("IssueBoard or PREndPage ", details.url);
    chrome.tabs.executeScript({
      file: "dist/contentScript.bundle.js"
    });
  }
});
