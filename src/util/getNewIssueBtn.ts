export default function getNewIssueBtn(): HTMLAnchorElement | null {
  return document.querySelector(
    'a[href="/YeThor/Pin-Github/issues/new"][role="button"]'
  );
}
