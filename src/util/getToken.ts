export default function getToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("token", result => {
      resolve(result.token);
    });
  });
}
