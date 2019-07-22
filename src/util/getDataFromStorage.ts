export interface state {
  token: string;
  title: string;
  assignees: string[];
  labels: string[];
  milestone: string;
}

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
