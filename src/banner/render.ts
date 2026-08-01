import figlet from "figlet";
import { BANNER_FONTS, type BannerStyle } from "./styles";

export function renderBanner(text: string, style: BannerStyle = "heavy"): string {
  const art = figlet.textSync(text, {
    // figlet font names are validated at runtime against bundled fonts
    font: BANNER_FONTS[style] as never,
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  return `\n${art}\n`;
}
