import { fromEvent } from "rxjs";
import getDataFromStorage from "./util/getDataFromStorage";
import getNewIssueBtn from "./util/getNewIssueBtn";
import state from "./type/state";
import { getPREditButton } from "./util/getPREditBtn";
import { addPRCustomBtn } from "./util/addPRCustomBtn";
import addIssueCumstomBtn from "./util/addIssueCustomBtn";

(function() {
  console.log("content-script2");
  const issueBtn = getNewIssueBtn();
  const prBtn = getPREditButton();

  if (document.querySelector(".custom-btn")) {
    return;
  }

  if (issueBtn) {
    addIssueCumstomBtn(issueBtn);
  }
  if (prBtn) {
    addPRCustomBtn(prBtn);
  }
})();
