import type { CipherScopeConfig } from "../config/load";
import { terminalLink } from "./link";

export function renderDeveloper(config: CipherScopeConfig): string {
  if (!config.developer.enabled) return "";

  const { name, website, github } = config.developer;
  const lines: string[] = ["Developer"];

  if (name) {
    lines.push(`  Name     ${name}`);
  }

  if (website) {
    lines.push(`  Website  ${terminalLink(website)}`);
  }

  if (github) {
    lines.push(`  GitHub   ${terminalLink(github)}`);
  }

  if (lines.length === 1) return "";

  return `\n${lines.join("\n")}\n`;
}
