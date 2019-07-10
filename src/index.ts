import { fromEvent } from "rxjs";
import { take } from "rxjs/operators";

const initializeApp = (): void => {
  const tokenInput = document.querySelector("#token-input");
  const onTokenSaveBtn$ = fromEvent(
    document.querySelector("#token-btn") as HTMLButtonElement,
    "click"
  );

  onTokenSaveBtn$.subscribe(() => {
    console.log("clicked");
  });
};

window.addEventListener("DOMContentLoaded", initializeApp);
