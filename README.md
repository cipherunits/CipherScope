# CipherScope

**Project context in your terminal — before you run anything.**

CipherScope is a small CLI that prints a branded ASCII banner plus auto-detected project facts. Everything is controlled from one file: `cipherscope.toml`.

[![npm version](https://img.shields.io/npm/v/cipher-scope.svg)](https://www.npmjs.com/package/cipher-scope)
[![npm downloads](https://img.shields.io/npm/dm/cipher-scope.svg)](https://www.npmjs.com/package/cipher-scope)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)

```text
 ██████╗██╗██████╗ ██╗  ██╗███████╗██████╗ ███████╗ ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██║██╔══██╗██║  ██║██╔════╝██╔══██╗██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║██████╔╝███████║█████╗  ██████╔╝███████╗██║     ██║   ██║██████╔╝█████╗
██║     ██║██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗╚════██║██║     ██║   ██║██╔═══╝ ██╔══╝
╚██████╗██║██║     ██║  ██║███████╗██║  ██║███████║╚██████╗╚██████╔╝██║     ███████╗
 ╚═════╝╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚══════╝

Project
  Env              development  (.env.development)
  Package Manager  pnpm
  Version          1.2.3

Developer
  Name     CipherUnits
  Website  https://cipherunits.xyz
  GitHub   https://github.com/cipherunits
```

---

## Features

| Feature | What it does |
| --- | --- |
| **ASCII banner** | Renders `[project].name` in 5 weights (`thin` → `heavy`) |
| **Project info** | Auto-detects env profile, package manager, and app version |
| **Developer block** | Name, website, and GitHub — clickable in supported terminals |
| **One config file** | All toggles live in `cipherscope.toml` |
| **npm script hook** | `init` injects `cipherscope` as the **first** script in `package.json` |

Coming later: Git status, Docker context, env var panel, themes, and `cipher-scope run`.

---

## Install

```bash
npm install -g cipher-scope
```

Or use without a global install:

```bash
npx cipher-scope
```

Requires **Node.js 18+**.

---

## Quick start

### 1. Initialize

In your project root:

```bash
npx cipher-scope
```

This will:

1. Create `cipherscope.toml`
2. Add this as the **first** script in `package.json`:

```json
{
  "scripts": {
    "cipherscope": "cipher-scope banner",
    "dev": "next dev"
  }
}
```

### 2. Wire it into your workflow

```json
{
  "scripts": {
    "cipherscope": "cipher-scope banner",
    "dev": "npm run cipherscope && next dev",
    "start": "npm run cipherscope && node dist/server.js"
  }
}
```

### 3. Run

```bash
npm run cipherscope
# or
npx cipher-scope banner
```

---

## Configuration

All behavior is driven by `cipherscope.toml`.

```toml
[project]
name = "My Project"

[brand]
enabled = true
# thin | light | regular | bold | heavy
style = "heavy"

[info]
enabled = true
env = true
package_manager = true
version = true

[developer]
enabled = false
name = ""
website = ""
github = ""
```

### `[project]`

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | string | `"My Project"` | Text rendered in the ASCII banner |

### `[brand]`

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | bool | `true` | Show / hide the banner |
| `style` | string | `"heavy"` | Banner weight |

**Styles** (thin → heavy):

| Value | Look |
| --- | --- |
| `thin` | Compact, small letters |
| `light` | Slanted, light stroke |
| `regular` | Classic standard |
| `bold` | Large block letters |
| `heavy` | Dense shadow block (ANSI Shadow) |

### `[info]`

Auto-detected facts. Turn the whole block off with `enabled`, or toggle each row.

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | bool | `true` | Show the project info block |
| `env` | bool | `true` | Active `.env` profile (`development`, `staging`, …) |
| `package_manager` | bool | `true` | `npm` / `pnpm` / `yarn` / `bun` (from lockfiles) |
| `version` | bool | `true` | Version from the project’s `package.json` |

**Env detection order**

1. `NODE_ENV` when set (`development`, `staging`, `production`, …)
2. Otherwise the first existing file among:

`.env.local` → `.env.development` / `.env.dev` → `.env.staging` / `.env.stage` → `.env.production` / `.env.prod` → `.env.test` → `.env`

**Package manager detection**

`pnpm-lock.yaml` → `yarn.lock` → `bun.lock` / `bun.lockb` → `package-lock.json` → `npm_config_user_agent`

### `[developer]`

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | bool | `false` | Show the developer block |
| `name` | string | `""` | Person or team name |
| `website` | string | `""` | Website URL (OSC-8 link when supported) |
| `github` | string | `""` | GitHub URL (OSC-8 link when supported) |

Example:

```toml
[developer]
enabled = true
name = "CipherUnits"
website = "https://cipherunits.xyz"
github = "https://github.com/cipherunits"
```

---

## CLI

| Command | Description |
| --- | --- |
| `cipher-scope` | Create `cipherscope.toml` + inject the npm script |
| `cipher-scope init` | Same as above |
| `cipher-scope banner` | Print banner, project info, and developer block |

---

## Programmatic use

```ts
import {
  loadConfig,
  renderBanner,
  detectEnv,
  detectPackageManager,
  detectAppVersion,
} from "cipher-scope";

const config = loadConfig();
console.log(renderBanner(config.project.name, config.brand.style));
console.log(detectEnv());
console.log(detectPackageManager());
console.log(detectAppVersion());
```

---

## Development

```bash
git clone https://github.com/cipherunits/CipherScope.git
cd CipherScope
pnpm install
pnpm build
```

---

## License

MIT © [CipherUnits](https://github.com/cipherunits)
