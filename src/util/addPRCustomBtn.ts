import { fromEvent } from "rxjs";
import getToken from "./getToken";
import getDataFromStorage from "./getDataFromStorage";
import editPR from "./editPR";
import state from "../type/state";

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

  fromEvent(customPRBtn, "click").subscribe(() => {
    getDataFromStorage().then((res: state): Promise<Response> => editPR(res));
  });
}
