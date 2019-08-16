import { fromEvent, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import M from "materialize-css";

import getToken from "./util/getToken";
import getDataFromStorage from "./util/getDataFromStorage";
import state from "./type/state";

export default class App {
  private _tokenField!: HTMLDivElement;
  private _tokenInput!: HTMLInputElement;
  private _tokenLabel!: HTMLLabelElement;
  private _saveBtn!: HTMLButtonElement;
  private _savePRBtn!: HTMLButtonElement;

  public constructor() {
    this._initMaterializeCSS();

    this._assignDOM();
    this._attachEvents();

    getToken().then(
      (token: string): void => {
        this._displayToken(token);
      }
    );

    getDataFromStorage().then(
      (res: state): void => {
        this._displayTemplate(res);
      }
    );
  }

  private _initMaterializeCSS(): void {
    M.Tabs.init(document.querySelector(".tabs") as HTMLElement);
    M.Modal.init(document.querySelectorAll(".modal"));
  }

  private _attachEvents(): void {
    fromEvent(this._saveBtn, "click").subscribe(() => {
      document.querySelectorAll("#test1 input").forEach(
        (el: Element): void => {
          this._storeTemplate(el);
        }
      );
    });

    fromEvent(this._savePRBtn, "click").subscribe(() => {
      document.querySelectorAll("#test2 input").forEach(
        (el: Element): void => {
          this._storeTemplate(el);
        }
      );
    });

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
    this._saveBtn = document.querySelector("#save-btn") as HTMLButtonElement;
    this._savePRBtn = document.querySelector(
      "#save-btn-pr"
    ) as HTMLButtonElement;
    this._tokenField = document.querySelector("#token") as HTMLDivElement;

    this._tokenInput = document.querySelector(
      "#token-input"
    ) as HTMLInputElement;

    this._tokenLabel = document.querySelector(
      'label[for="token-input"]'
    ) as HTMLLabelElement;
  }

  private _displayTemplate(state: state): void {
    for (let key in state) {
      if (state[key].length === 0) continue;

      const input = document.querySelector(`#${key} input`) as HTMLInputElement;
      const label = document.querySelector(`#${key} label`) as HTMLLabelElement;

      // TODO: chip 데이터 만들기
      if (state[key] instanceof Array) {
        let innerHTML = "";

        Array.from(state[key]).forEach((item, index) => {
          if (index === state[key].length - 1) {
            innerHTML += `${item}`;
          } else {
            innerHTML += `${item},`;
          }
        });
        input.value = innerHTML;
      } else {
        input.value = state[key] as string;
      }
      label.classList.add("active");
    }
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

  private _storeTemplate(el: Element): void {
    const key = (el.parentElement as HTMLElement).getAttribute("id");
    const value = (el as HTMLInputElement).value;

    if (!key) {
      throw Error("No id");
    }

    if (["assignees", "labels", "prassignees", "prlabels"].includes(key)) {
      const values = value.split(",").map(item => item.trim());
      chrome.storage.sync.set({ [key]: values });
    } else {
      chrome.storage.sync.set({ [key]: value.trim() });
    }
  }
}
