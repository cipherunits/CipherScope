/** OSC-8 hyperlink so supported terminals make the URL clickable. */
export function terminalLink(url: string): string {
  if (!url) return "";

  if (!process.stdout.isTTY) {
    return url;
  }

  return `\u001b]8;;${url}\u0007${url}\u001b]8;;\u0007`;
}
