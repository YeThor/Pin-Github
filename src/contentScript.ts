import { fromEvent } from "rxjs";
import getDataFromStorage from "./util/getDataFromStorage";
import getNewIssueBtn from "./util/getNewIssueBtn";
import state from "./type/state";
import { getPREditButton } from "./util/getPREditBtn";
import { addPRCustomBtn } from "./util/addPRCustomBtn";

(function() {
  console.log("content-script2");
  const newIssueBtn = getNewIssueBtn();
  const prBtn = getPREditButton();

  if (document.querySelector(".custom-btn")) {
    return;
  }

  if (newIssueBtn) {
    const customIssueBtn = document.createElement("a");

    customIssueBtn.innerText = "Custom issue";

    [...newIssueBtn.classList].forEach(className => {
      customIssueBtn.classList.add(className);
    });

    customIssueBtn.classList.add("custom-btn");

    newIssueBtn.parentNode!.insertBefore(
      customIssueBtn,
      newIssueBtn.nextSibling
    );

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
  }
  if (prBtn) {
    addPRCustomBtn(prBtn);
  }
})();

function createIssue(res: state): Promise<Response> {
  const reqParam: Partial<state> = {};
  const { token, title, milestone, labels, assignees } = res;

  if (title && title.trim() !== "") {
    reqParam.title = title;
  }

  if (milestone && milestone.trim() !== "") {
    reqParam.milestone = milestone;
  }

  if (labels && labels.length > 0) {
    reqParam.labels = labels;
  }

  if (assignees && assignees.length > 0) {
    reqParam.assignees = assignees;
  }

  return fetch("https://api.github.com/repos/YeThor/Pin-Github/issues", {
    method: "POST",
    headers: new Headers({
      Authorization: `token ${token}`,
      "Content-Type": "application/vnd.github.symmetra-preview+json"
    }),
    body: JSON.stringify(reqParam)
  });
}
