export type BannerStyle = "thin" | "light" | "regular" | "bold" | "heavy";

/** Five weights, thin → heavy (figlet fonts). */
export const BANNER_FONTS: Record<BannerStyle, string> = {
  thin: "Small",
  light: "Slant",
  regular: "Standard",
  bold: "Big",
  heavy: "ANSI Shadow",
};

export const BANNER_STYLES = Object.keys(BANNER_FONTS) as BannerStyle[];

export function isBannerStyle(value: string): value is BannerStyle {
  return value in BANNER_FONTS;
}
