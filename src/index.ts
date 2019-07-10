import { fromEvent, Observable } from "rxjs";
import { take } from "rxjs/operators";

const initializeApp = (): App => new App();

class App {
  private _onTokenBtnClick$: Observable<Event>;
  private _token: string = "";

  constructor() {
    this._onTokenBtnClick$ = fromEvent(
      document.querySelector("#token-btn") as HTMLButtonElement,
      "click"
    );

    this._init();
  }

  private _init(): void {
    this._watchObservables();
  }

  private _watchObservables(): void {
    this._onTokenBtnClick$.subscribe(this._storeToken);
  }

  private _storeToken(): void {
    const token = (document.querySelector("#token-input") as HTMLInputElement)
      .value;

    chrome.storage.sync.set({ token }, () => {
      const tokenInputBtn = document.querySelector(
        "#token-input"
      ) as HTMLInputElement;
      const tokenSaveBtn = document.querySelector(
        "#token-btn"
      ) as HTMLButtonElement;

      tokenInputBtn.type = "password";
      tokenInputBtn.disabled = true;
      tokenInputBtn.style.border = "none";

      tokenSaveBtn.innerText = "Edit";
    });
  }
}

window.addEventListener("DOMContentLoaded", initializeApp);
