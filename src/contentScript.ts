import { fromEvent } from "rxjs";
import getDataFromStorage from "./util/getDataFromStorage";
import getNewIssueBtn from "./util/getNewIssueBtn";
import state from "./type/state";

(function() {
  const newIssueBtn = getNewIssueBtn();

  if (!newIssueBtn) {
    return;
  }

  if (document.querySelector(".custom-btn")) {
    return;
  }

  console.log("content-script");

  const customIssueBtn = document.createElement("a");

  customIssueBtn.innerText = "Custom issue";

  [...newIssueBtn.classList].forEach(className => {
    customIssueBtn.classList.add(className);
  });

  customIssueBtn.classList.add("custom-btn");

  newIssueBtn.parentNode!.insertBefore(customIssueBtn, newIssueBtn.nextSibling);

  fromEvent(customIssueBtn, "click").subscribe(() => {
    getDataFromStorage()
      .then((res: state): Promise<Response> => createIssue(res))
      .then((res: Response): Promise<any> => res.json())
      .then(
        (res: any): void => {
          window.location.href = res.html_url;
        }
      );
  });
})();

function createIssue({
  token,
  title,
  assignees,
  labels,
  milestone
}: state): Promise<Response> {
  return fetch("https://api.github.com/repos/YeThor/Pin-Github/issues", {
    method: "POST",
    headers: new Headers({
      Authorization: `token ${token}`,
      "Content-Type": "application/vnd.github.symmetra-preview+json"
    }),
    body: JSON.stringify({
      title,
      labels,
      assignees,
      milestone
    })
  });
}
