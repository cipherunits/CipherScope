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
};

const DEFAULT_CONFIG: CipherScopeConfig = {
  project: { name: "My Project" },
  brand: { enabled: true, style: "heavy" },
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
  const match = block.match(new RegExp(`^\\s*${key}\\s*=\\s*(true|false)`, "m"));
  if (!match) return undefined;
  return match[1] === "true";
}

export function loadConfig(path = "cipherscope.toml"): CipherScopeConfig {
  if (!existsSync(path)) {
    return { ...DEFAULT_CONFIG };
  }

  const content = readFileSync(path, "utf8");
  const project = section(content, "project");
  const brand = section(content, "brand");

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
  };
}
