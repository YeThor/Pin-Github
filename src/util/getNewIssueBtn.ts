export default function getNewIssueBtn(): HTMLAnchorElement | null {
  return document.querySelector(
    `a[href="${window.location.pathname}/new"][role="button"]`
  );
}
