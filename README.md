# CipherScope

**Project context, right when you need it.**

CipherScope is a CLI that surfaces the important bits of your project — runtime, environment, Git, Docker, and more — before and while you run it. Configure everything through a single `cipherscope.toml`.

[![npm version](https://img.shields.io/npm/v/cipher-scope.svg)](https://www.npmjs.com/package/cipher-scope)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)

> **Status:** `v0.0.2` — init, package.json script injection, and 5-weight ASCII banners. Runtime UI, Git, Env, and Docker modules are on the roadmap.

---

## Why CipherScope?

When you run a project, context is usually scattered: which branch am I on? What’s in `.env`? Which Docker service is this? CipherScope brings that into one readable terminal view, driven by config — not hardcoded scripts.

| Module | Purpose |
| --- | --- |
| **Runtime** | Node version, package manager, OS, memory |
| **Environment** | Env vars with secret redaction |
| **Git** | Branch, commit, working-tree status |
| **Docker** | Service / image / port context |
| **Brand & UI** | Themes, modes, custom branding |

---

## Install

```bash
npm install -g cipher-scope
# or use without installing:
npx cipher-scope
```

Requires **Node.js 18+**.

---

## Quick start

```bash
npx cipher-scope
# or:
npx cipher-scope init
```

This will:

1. Create `cipherscope.toml` in the current directory
2. Add a **`cipherscope`** script as the **first** entry in `package.json`

```json
{
  "scripts": {
    "cipherscope": "cipher-scope banner",
    "dev": "npm run cipherscope && next dev"
  }
}
```

Then show the banner anytime:

```bash
npm run cipherscope
# or
npx cipher-scope banner
```

Default config:

```toml
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
# thin | light | regular | bold | heavy
style = "heavy"

[modules]
runtime = true
git = true
env = false
docker = false
memory = false
network = false

[env]
enabled = false
hide = ["PASSWORD", "SECRET", "TOKEN", "KEY", "PRIVATE_KEY"]
```

Change `name` and `style`, then re-run the script to preview.

---

## Banner styles

Five weights from thin to heavy:

| `style` | Look |
| --- | --- |
| `thin` | Compact small letters |
| `light` | Slanted / light stroke |
| `regular` | Classic standard |
| `bold` | Large block letters |
| `heavy` | Dense shadow block (ANSI Shadow) |

The banner renders `[project].name` with the selected weight.

---

## CLI

| Command | Description |
| --- | --- |
| `cipher-scope` | Create config + inject npm script |
| `cipher-scope init` | Same as above |
| `cipher-scope banner` | Print the project banner |

---

## Configuration reference

### `[project]`

| Key | Type | Description |
| --- | --- | --- |
| `name` | string | Project display name |

### `[ui]`

| Key | Type | Description |
| --- | --- | --- |
| `enabled` | bool | Toggle UI output |
| `mode` | string | Display mode (`default`, later: `minimal`, `compact`, `cyber`) |
| `bold` | bool | Bold text |
| `animation` | bool | Terminal animation |
| `color` | string | Accent color |

### `[brand]`

| Key | Type | Description |
| --- | --- | --- |
| `enabled` | bool | Show the ASCII banner |
| `style` | string | Banner weight: `thin` \| `light` \| `regular` \| `bold` \| `heavy` |

### `[modules]`

Toggle what CipherScope collects and shows:

| Key | Default | Description |
| --- | --- | --- |
| `runtime` | `true` | Runtime / Node / OS info |
| `git` | `true` | Git status |
| `env` | `false` | Environment variables |
| `docker` | `false` | Docker service context |
| `memory` | `false` | Memory usage |
| `network` | `false` | Network-related info |

### `[env]`

| Key | Type | Description |
| --- | --- | --- |
| `enabled` | bool | Enable env module |
| `hide` | string[] | Substrings that mark secrets (values are redacted) |

---

## Roadmap

Planned next:

1. Static UI engine (banner, themes, modes)
2. TOML-driven behavior & validation
3. Environment module with secret hiding
4. Git & Docker integration
5. Runtime / memory / OS panel
6. Custom branding
7. Auto-run before scripts (`cipher-scope run dev`)

Full plan: [`CipherScope_Roadmap.md`](./CipherScope_Roadmap.md)

---

## Development

```bash
git clone https://github.com/cipherunits/CipherScope.git
cd CipherScope
pnpm install   # or npm install
pnpm build     # or npm run build
```

Local smoke test:

```bash
npm pack
cd test
npm install ../cipher-scope-0.0.1.tgz
npx cipher-scope
```

---

## License

MIT © [CipherUnits](https://github.com/cipherunits)
