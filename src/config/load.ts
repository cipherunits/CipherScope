import { existsSync, readFileSync } from "node:fs";
import { isBannerStyle, type BannerStyle } from "../banner/styles";

export type CipherScopeConfig = {
  project: {
    name: string;
  };
  brand: {
    enabled: boolean;
    style: BannerStyle;
  };
  info: {
    enabled: boolean;
    env: boolean;
    package_manager: boolean;
    version: boolean;
  };
  developer: {
    enabled: boolean;
    name: string;
    website: string;
    github: string;
  };
};

const DEFAULT_CONFIG: CipherScopeConfig = {
  project: { name: "My Project" },
  brand: { enabled: true, style: "heavy" },
  info: {
    enabled: true,
    env: true,
    package_manager: true,
    version: true,
  },
  developer: {
    enabled: false,
    name: "",
    website: "",
    github: "",
  },
};

function section(content: string, name: string): string {
  const match = content.match(
    new RegExp(`\\[${name}\\]([\\s\\S]*?)(?=\\n\\[|$)`, "i"),
  );
  return match?.[1] ?? "";
}

function stringValue(block: string, key: string): string | undefined {
  const match = block.match(new RegExp(`^\\s*${key}\\s*=\\s*"([^"]*)"`, "m"));
  return match?.[1];
}

function boolValue(block: string, key: string): boolean | undefined {
  const match = block.match(
    new RegExp(`^\\s*${key}\\s*=\\s*(true|false)`, "m"),
  );
  if (!match) return undefined;
  return match[1] === "true";
}

export function loadConfig(path = "cipherscope.toml"): CipherScopeConfig {
  if (!existsSync(path)) {
    return structuredClone(DEFAULT_CONFIG);
  }

  const content = readFileSync(path, "utf8");
  const project = section(content, "project");
  const brand = section(content, "brand");
  const info = section(content, "info");
  const developer = section(content, "developer");

  const styleRaw = stringValue(brand, "style") ?? DEFAULT_CONFIG.brand.style;
  const style = isBannerStyle(styleRaw) ? styleRaw : DEFAULT_CONFIG.brand.style;

  return {
    project: {
      name: stringValue(project, "name") ?? DEFAULT_CONFIG.project.name,
    },
    brand: {
      enabled: boolValue(brand, "enabled") ?? DEFAULT_CONFIG.brand.enabled,
      style,
    },
    info: {
      enabled: boolValue(info, "enabled") ?? DEFAULT_CONFIG.info.enabled,
      env: boolValue(info, "env") ?? DEFAULT_CONFIG.info.env,
      package_manager:
        boolValue(info, "package_manager") ??
        DEFAULT_CONFIG.info.package_manager,
      version: boolValue(info, "version") ?? DEFAULT_CONFIG.info.version,
    },
    developer: {
      enabled:
        boolValue(developer, "enabled") ?? DEFAULT_CONFIG.developer.enabled,
      name: stringValue(developer, "name") ?? DEFAULT_CONFIG.developer.name,
      website:
        stringValue(developer, "website") ?? DEFAULT_CONFIG.developer.website,
      github:
        stringValue(developer, "github") ?? DEFAULT_CONFIG.developer.github,
    },
  };
}
