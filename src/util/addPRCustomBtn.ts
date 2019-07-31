export function addPRCustomBtn(PRBtn: HTMLButtonElement): void {
  const customPRBtn = document.createElement("button");

  customPRBtn.innerText = "Apply fields";

  [...PRBtn.classList].forEach(className => {
    customPRBtn.classList.add(className);
  });

  customPRBtn.classList.add("custom-btn");

  PRBtn.parentNode!.insertBefore(customPRBtn, PRBtn);
}
