import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SCRIPT_NAME = "cipherscope";
const SCRIPT_VALUE = "cipher-scope banner";

function getTemplate(): string {
  const here = __dirname;
  const candidates = [
    join(here, "..", "templates", "cipherscope.toml"),
    join(here, "..", "..", "templates", "cipherscope.toml"),
    join(here, "templates", "cipherscope.toml"),
  ];

  for (const path of candidates) {
    if (existsSync(path)) {
      return readFileSync(path, "utf8");
    }
  }

  throw new Error("Could not find cipherscope.toml template");
}

function ensureConfigFile(): boolean {
  const configFile = "cipherscope.toml";

  if (existsSync(configFile)) {
    console.log("⚠️  cipherscope.toml already exists.");
    return false;
  }

  writeFileSync(configFile, getTemplate());
  console.log("✅ Created cipherscope.toml");
  return true;
}

function ensurePackageScript(): void {
  const pkgPath = "package.json";

  if (!existsSync(pkgPath)) {
    console.log("⚠️  No package.json found — skipped script injection.");
    return;
  }

  const raw = readFileSync(pkgPath, "utf8");
  const pkg = JSON.parse(raw) as {
    scripts?: Record<string, string>;
  };

  const existing = pkg.scripts ?? {};
  const alreadyFirst =
    Object.keys(existing)[0] === SCRIPT_NAME &&
    existing[SCRIPT_NAME] === SCRIPT_VALUE;

  if (alreadyFirst) {
    console.log(`⚠️  Script "${SCRIPT_NAME}" already present.`);
    return;
  }

  const { [SCRIPT_NAME]: _removed, ...rest } = existing;

  pkg.scripts = {
    [SCRIPT_NAME]: SCRIPT_VALUE,
    ...rest,
  };

  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log(
    `✅ Added "${SCRIPT_NAME}" as the first script in package.json`,
  );
  console.log(`   Use it like:  "dev": "npm run ${SCRIPT_NAME} && …"`);
}

export function initCommand() {
  ensureConfigFile();
  ensurePackageScript();
}
