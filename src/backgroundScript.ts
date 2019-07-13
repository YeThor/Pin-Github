console.log("background");
chrome.webNavigation.onHistoryStateUpdated.addListener(function() {
  console.log("history state updated");
});
