import { initCommand } from "../commands/init";
import { bannerCommand } from "../commands/banner";

const command = process.argv[2];

switch (command) {
  case "init":
  case undefined:
    initCommand();
    break;

  case "banner":
    bannerCommand();
    break;

  default:
    console.log(`
CipherScope CLI

Usage:

  cipher-scope              Create config + add npm script
  cipher-scope init         Same as above
  cipher-scope banner       Print project banner from cipherscope.toml

Banner styles in cipherscope.toml [brand] style:
  thin | light | regular | bold | heavy
`);
}
