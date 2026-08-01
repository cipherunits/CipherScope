import { existsSync } from "node:fs";
import { loadConfig } from "../config/load";
import { renderBanner } from "../banner/render";
import { renderProjectInfo } from "../display/info";
import { renderDeveloper } from "../display/developer";

export function bannerCommand() {
  if (!existsSync("cipherscope.toml")) {
    console.error(
      "❌ cipherscope.toml not found. Run `npx cipher-scope init` first.",
    );
    process.exitCode = 1;
    return;
  }

  const config = loadConfig();
  let output = "";

  if (config.brand.enabled) {
    output += renderBanner(config.project.name, config.brand.style);
  }

  output += renderProjectInfo(config);
  output += renderDeveloper(config);

  if (output) {
    process.stdout.write(output.endsWith("\n") ? output : `${output}\n`);
  }
}
