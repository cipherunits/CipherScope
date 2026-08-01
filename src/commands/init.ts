import { existsSync, writeFileSync } from "node:fs";

const TEMPLATE = `# ============================================================
# CipherScope Configuration
# ============================================================

[project]

name = "My Project"



[ui]

enabled = true
mode = "default"
bold = true
animation = false
color = "cyan"



[brand]

enabled = true
text = "CipherScope"



[modules]

runtime = true
git = true
env = false
docker = false
memory = false
network = false



[env]

enabled = false

# Hide sensitive variables
hide = [
  "PASSWORD",
  "SECRET",
  "TOKEN",
  "KEY",
  "PRIVATE_KEY"
]
`;

export function initCommand() {
  const configFile = "cipherscope.toml";

  if (existsSync(configFile)) {
    console.log("⚠️  cipherscope.toml already exists.");
    return;
  }

  writeFileSync(configFile, TEMPLATE);

  console.log("✅ Created cipherscope.toml");
}
