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
    M.Chips.init(document.querySelectorAll(".chips"), {
      onChipDelete: (element: any): void => {
        const chips = element[0] as Element;

        console.log(chips.childElementCount);
        if (chips.childElementCount === 2) {
          chips.querySelector("label")!.classList.remove("active");
          chips.querySelector("input")!.style.display = "inline-block";
        }
      }
    });

    this._makeCustomInput(document.querySelector("#assignees") as HTMLElement);
    this._makeCustomInput(document.querySelector("#labels") as HTMLElement);
  }

  private _makeCustomInput(fieldElement: HTMLElement): void {
    const label = fieldElement.querySelector("label") as HTMLLabelElement;
    const input = fieldElement.querySelector("input") as HTMLInputElement;
    const hasChips = (): boolean =>
      !(input.previousElementSibling instanceof HTMLLabelElement);

    fromEvent(fieldElement, "click")
      .pipe(filter((e: Event) => (e.target as HTMLElement).tagName !== "I"))
      .subscribe(() => {
        this._useLabelWithChips(fieldElement);
        input.style.display = "inline-block";
        input.focus();
      });

    fromEvent(input, "blur")
      .pipe(filter(hasChips))
      .subscribe(() => {
        input.style.display = "none";
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
    fromEvent(this._saveBtn, "click").subscribe(() => {
      document.querySelectorAll(".contents input").forEach(
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

  private _saveChipsOnStorage(key: string): void {
    const chipsData = M.Chips.getInstance(document.querySelector(
      `.chips#${key}`
    ) as HTMLElement).chipsData.map((item: M.ChipData): string => item.tag);

    chrome.storage.sync.set({ [key]: chipsData });
    console.log("save -", key, chipsData);
  }

  private _assignDOM(): void {
    this._saveBtn = document.querySelector("#save-btn") as HTMLButtonElement;
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
      const input = document.querySelector(`#${key} input`) as HTMLInputElement;
      const label = document.querySelector(`#${key} label`) as HTMLLabelElement;

      // TODO: chip 데이터 만들기
      if (state[key] instanceof Array) {
        const instance = M.Chips.getInstance(document.querySelector(
          `.chips#${key}`
        ) as HTMLElement);

        Array.from(state[key]).forEach(item => {
          instance.addChip({
            tag: item as string
          });
        });
        input.style.display = "none";
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
    const value = (el as HTMLInputElement).value.trim();

    if (!key) {
      throw Error("No id");
    }

    ["assignees", "labels"].includes(key)
      ? this._saveChipsOnStorage(key)
      : chrome.storage.sync.set({ [key]: value });
  }
}
