import getToken from "./util/getToken";

console.log("content-script");

(function() {
  const newIssueBtn = getNewIssueBtn();

  if (!newIssueBtn) {
    return;
  }

  console.log(newIssueBtn);
  getToken().then(
    (token: string): void => {
      fetch("https://api.github.com/repos/YeThor/Pin-Github/issues", {
        method: "POST",
        headers: new Headers({
          Authorization: `token ${token}`
        }),
        body: JSON.stringify({
          title: "Test Title",
          body: "Test Body"
        })
      }).then(res => console.log(res));
    }
  );
})();

function getNewIssueBtn(): HTMLElement | null {
  return document.querySelector(
    'a[href="/YeThor/Pin-Github/issues/new"][role="button"]'
  );
}
