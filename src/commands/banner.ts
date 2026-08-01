import { existsSync } from "node:fs";
import { loadConfig } from "../config/load";
import { renderBanner } from "../banner/render";

export function bannerCommand() {
  if (!existsSync("cipherscope.toml")) {
    console.error(
      "❌ cipherscope.toml not found. Run `npx cipher-scope init` first.",
    );
    process.exitCode = 1;
    return;
  }

  const config = loadConfig();

  if (!config.brand.enabled) {
    return;
  }

  process.stdout.write(renderBanner(config.project.name, config.brand.style));
}
