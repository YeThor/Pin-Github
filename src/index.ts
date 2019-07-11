import { fromEvent, Observable } from "rxjs";

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
    this._getToken();
  }

  private _watchObservables(): void {
    this._onTokenBtnClick$.subscribe(() => {
      this._onTokenBtnClick();
    });
  }

  private _onTokenBtnClick(): void {
    const isEdit =
      (document.querySelector("#token-btn") as HTMLButtonElement).innerText ===
      "Edit";

    isEdit ? this._enableInput() : this._storeToken();
  }

  private _storeToken(): void {
    const token = (document.querySelector("#token-input") as HTMLInputElement)
      .value;

    chrome.storage.sync.set({ token }, () => {
      this._disableInput();
      this._getToken();
    });
  }

  private _getToken(): void {
    chrome.storage.sync.get("token", result => {
      this._token = result.token || "";

      (document.querySelector(
        "#token-input"
      ) as HTMLInputElement).value = this._token;
    });
  }

  private _enableInput(): void {
    const tokenInputBtn = document.querySelector(
      "#token-input"
    ) as HTMLInputElement;
    const tokenSaveBtn = document.querySelector(
      "#token-btn"
    ) as HTMLButtonElement;

    tokenInputBtn.type = "text";
    tokenInputBtn.disabled = false;
    tokenInputBtn.style.border = "2px solid grey";
    tokenInputBtn.focus();

    tokenSaveBtn.innerText = "Save";
  }

  private _disableInput(): void {
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
  }
}

window.addEventListener("DOMContentLoaded", initializeApp);
