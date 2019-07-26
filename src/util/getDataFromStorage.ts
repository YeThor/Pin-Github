import state from "../type/state";

export default function getDataFromStorage(): Promise<state> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(
      ["token", "title", "assignees", "labels", "milestone"],
      (result: any) => {
        resolve(result);
      }
    );
  });
}
