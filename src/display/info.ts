import type { CipherScopeConfig } from "../config/load";
import { detectEnv } from "../detect/env";
import { detectPackageManager } from "../detect/package-manager";
import { detectAppVersion } from "../detect/version";

export function renderProjectInfo(config: CipherScopeConfig): string {
  if (!config.info.enabled) return "";

  const lines: string[] = ["Project"];
  const { env, package_manager, version } = config.info;

  if (env) {
    const detected = detectEnv();
    const detail = detected.file
      ? `${detected.profile}  (${detected.file})`
      : detected.profile;
    lines.push(`  Env              ${detail}`);
  }

  if (package_manager) {
    lines.push(`  Package Manager  ${detectPackageManager()}`);
  }

  if (version) {
    lines.push(`  Version          ${detectAppVersion() ?? "unknown"}`);
  }

  if (lines.length === 1) return "";

  return `\n${lines.join("\n")}\n`;
}
