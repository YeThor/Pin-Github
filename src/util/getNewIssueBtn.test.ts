import getNewIssueBtn from "./getNewIssueBtn";

describe("getNewIssueBtn()", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("returns HTMLElement when target element exists", () => {
    // given
    document.body.innerHTML = `
      <div>
        <a 
          href="${window.location.pathname}/new" 
          class="btn btn-primary float-right" 
          role="button" data-hotkey="c" data-skip-pjax="">
         New issue
        </a>
      </div>`;

    // when, then
    expect(getNewIssueBtn()).toBeInstanceOf(HTMLAnchorElement);
  });

  it("returns null if there's no target element", () => {
    // given
    document.body.innerHTML = `<div><a></a></div>`;

    // when, then
    expect(getNewIssueBtn()).toBeNull();
  });
});
