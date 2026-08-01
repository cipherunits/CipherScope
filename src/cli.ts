import { initCommand } from "./commands/init";

const command = process.argv[2];

switch (command) {
  case "init":
  case undefined:
    initCommand();
    break;

  default:
    console.log(`
CipherScope CLI

Usage:

  cipher-scope
  cipher-scope init

Options:

  init     Create cipherscope.toml
`);
}
