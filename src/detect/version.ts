import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Read app version from the project's package.json. */
export function detectAppVersion(cwd = process.cwd()): string | null {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) return null;

  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as {
      version?: string;
    };
    return pkg.version ?? null;
  } catch {
    return null;
  }
}
