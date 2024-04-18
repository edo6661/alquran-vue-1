export function convertHtmlEntities(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
}

export function decodeHtmlEntities(html: string): string {
  const element = document.createElement("div");
  element.innerHTML = html;
  return element.innerText;
}

export const betterQuery = (q: string) => {
  return q.toLowerCase().replace(/['-]/g, "").trim();
};
