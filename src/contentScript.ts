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
    console.log("click");

    getToken().then(
      (token: string): void => {
        fetch("https://api.github.com/repos/YeThor/Pin-Github/issues", {
          method: "POST",
          headers: new Headers({
            Authorization: `token ${token}`,
            "Content-Type": "application/vnd.github.symmetra-preview+json"
          }),
          body: JSON.stringify({
            title: "Test Title",
            body: "Test Body"
          })
        }).then(res => {
          res.json().then(res => {
            window.location.href = res.html_url;
          });
        });
      }
    );
  });
})();

function getNewIssueBtn(): HTMLElement | null {
  return document.querySelector(
    'a[href="/YeThor/Pin-Github/issues/new"][role="button"]'
  );
}
