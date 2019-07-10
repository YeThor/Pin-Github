import { fromEvent, Observable } from "rxjs";
import { take } from "rxjs/operators";

const initializeApp = (): App => new App();

class App {
  private _onTokenBtnClick$: Observable<Event>;

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
      console.log(`just saved ${token}`);
    });
  }
}

window.addEventListener("DOMContentLoaded", initializeApp);
