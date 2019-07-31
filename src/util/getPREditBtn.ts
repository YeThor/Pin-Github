export function getPREditButton(): HTMLButtonElement | null {
  return document.querySelector('button[aria-label="Edit Pull Request title"]');
}
