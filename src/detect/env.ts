import { existsSync } from "node:fs";
import { join } from "node:path";

export type EnvDetection = {
  /** e.g. development, staging, production, local */
  profile: string;
  /** e.g. .env.development */
  file: string | null;
};

const ENV_CANDIDATES: Array<{ profile: string; file: string }> = [
  { profile: "local", file: ".env.local" },
  { profile: "development", file: ".env.development" },
  { profile: "development", file: ".env.dev" },
  { profile: "staging", file: ".env.staging" },
  { profile: "staging", file: ".env.stage" },
  { profile: "production", file: ".env.production" },
  { profile: "production", file: ".env.prod" },
  { profile: "test", file: ".env.test" },
  { profile: "default", file: ".env" },
];

const NODE_ENV_MAP: Record<string, string> = {
  development: "development",
  dev: "development",
  staging: "staging",
  stage: "staging",
  production: "production",
  prod: "production",
  test: "test",
};

function resolveProfileFromNodeEnv(): string | null {
  const raw = process.env.NODE_ENV?.trim().toLowerCase();
  if (!raw) return null;
  return NODE_ENV_MAP[raw] ?? raw;
}

/** Detect which env profile / file is in play for this project. */
export function detectEnv(cwd = process.cwd()): EnvDetection {
  const existing = ENV_CANDIDATES.filter(({ file }) =>
    existsSync(join(cwd, file)),
  );

  const nodeProfile = resolveProfileFromNodeEnv();

  if (nodeProfile) {
    const match =
      existing.find((item) => item.profile === nodeProfile) ??
      existing.find((item) => item.file === ".env");

    return {
      profile: nodeProfile,
      file: match?.file ?? null,
    };
  }

  // Prefer the most specific existing file (list is ordered specific → generic)
  const first = existing[0];
  if (first) {
    return { profile: first.profile, file: first.file };
  }

  return { profile: "none", file: null };
}
