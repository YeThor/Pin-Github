import getNewIssueBtn from "./util/getNewIssueBtn";

describe("getNewIssueBtn()", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("returns HTMLElement when target element exists", () => {
    // given
    document.body.innerHTML = `
      <div>
        <a 
          href="/YeThor/Pin-Github/issues/new" 
          class="btn btn-primary float-right" 
          role="button" data-hotkey="c" data-skip-pjax="">
         New issue
        </a>
      </div>`;

    // when
    const result = getNewIssueBtn();

    console.log(result);
    // then
    expect(result).toBeInstanceOf(HTMLAnchorElement);
  });

  it("returns null if there's no target element", () => {
    // given
    document.body.innerHTML = `<div><a></a></div>`;

    // when
    const result = getNewIssueBtn();

    // then
    expect(result).toBeNull();
  });
});
