import { fromEvent, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import M from "materialize-css";

import getToken from "./util/getToken";

export default class App {
  private _tokenField!: HTMLDivElement;
  private _tokenInput!: HTMLInputElement;
  private _tokenLabel!: HTMLLabelElement;

  public constructor() {
    this._initMaterializeCSS();

    this._assignDOM();
    this._attachEvents();

    getToken().then(
      (token: string): void => {
        this._displayToken(token);
      }
    );
  }

  private _initMaterializeCSS(): void {
    M.Tabs.init(document.querySelector(".tabs") as HTMLElement);
    M.Chips.init(document.querySelectorAll(".chips"));

    fromEvent(
      document.querySelector("#assignees") as HTMLElement,
      "click"
    ).subscribe(() => {
      this._useLabelWithChips(document.querySelector(
        "#assignees"
      ) as HTMLElement);
    });

    fromEvent(
      document.querySelector("#labels") as HTMLElement,
      "click"
    ).subscribe(() => {
      this._useLabelWithChips(document.querySelector("#labels") as HTMLElement);
    });
  }

  private _useLabelWithChips(elem: HTMLElement): void {
    if (
      elem.querySelector("input")!.value.length > 0 ||
      elem.classList.contains("focus") ||
      elem.querySelector("input")!.autofocus
    ) {
      elem.querySelector("label")!.classList.add("active");
    }
  }

  private _attachEvents(): void {
    fromEvent(this._tokenInput, "blur").subscribe(() => {
      this._tokenInput.type = "password";
      this._tokenInput.disabled = true;
      this._storeToken();
    });

    fromEvent(this._tokenField, "click")
      .pipe(filter(() => this._tokenInput.disabled === true))
      .subscribe(() => {
        this._tokenInput.type = "text";
        this._tokenInput.disabled = false;
        this._tokenInput.focus();
      });
  }

  private _assignDOM(): void {
    this._tokenField = document.querySelector("#token") as HTMLDivElement;

    this._tokenInput = document.querySelector(
      "#token-input"
    ) as HTMLInputElement;

    this._tokenLabel = document.querySelector(
      'label[for="token-input"]'
    ) as HTMLLabelElement;
  }

  private _displayToken(token: string): void {
    if (!token) {
      return;
    }

    this._tokenInput.value = token;
    this._tokenInput.type = "password";
    this._tokenInput.classList.add("valid");
    this._tokenInput.disabled = true;

    this._tokenLabel.classList.add("active");
  }

  private _storeToken(): void {
    const token = this._tokenInput.value.trim();

    if (token === "") {
      return;
    }

    chrome.storage.sync.set({ token });
  }
}
