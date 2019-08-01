import { fromEvent } from "rxjs";
import getToken from "./getToken";

export function addPRCustomBtn(PRBtn: HTMLButtonElement): void {
  const customPRBtn = document.createElement("button");

  customPRBtn.innerText = "Apply fields";

  [...PRBtn.classList].forEach(className => {
    if (className === "js-details-target") {
      return;
    }
    customPRBtn.classList.add(className);
  });

  customPRBtn.classList.add("custom-btn");

  PRBtn.parentNode!.insertBefore(customPRBtn, PRBtn);

  fromEvent(customPRBtn, "click").subscribe(async () => {
    const PRNumber = window.location.pathname.replace(/^\D+/, "");
    const token = await getToken();
    const reqParam = {
      labels: ["Spec"]
    };

    fetch(`https://api.github.com/repos/YeThor/Pin-Github/issues/${PRNumber}`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: `token ${token}`,
        "Content-Type": "application/vnd.github.symmetra-preview+json"
      }),
      body: JSON.stringify(reqParam)
    });
  });
}
