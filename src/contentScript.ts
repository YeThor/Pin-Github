import getToken from "./util/getToken";
import { fromEvent } from "rxjs";

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
    getToken()
      .then((token: string): Promise<Response> => createIssue(token))
      .then((res: Response): Promise<any> => res.json())
      .then(
        (res: any): void => {
          window.location.href = res.html_url;
        }
      );
  });
})();

function createIssue(token: string): Promise<Response> {
  return fetch("https://api.github.com/repos/YeThor/Pin-Github/issues", {
    method: "POST",
    headers: new Headers({
      Authorization: `token ${token}`,
      "Content-Type": "application/vnd.github.symmetra-preview+json"
    }),
    body: JSON.stringify({
      title: "Test Title",
      body: "Test Body",
      labels: ["feature", "test"],
      assignees: ["YeThor"],
      milestone: 1
    })
  });
}

export function getNewIssueBtn(): HTMLAnchorElement | null {
  return document.querySelector(
    'a[href="/YeThor/Pin-Github/issues/new"][role="button"]'
  );
}
