export interface BrandTheme {
  primary: string;           // Distinctive accent color (e.g. #18181b obsidian or customizable)
  primaryHover: string;
  primaryLight: string;      // Subtle tint for badges / tags
  textPrimary: string;       // Deep charcoal / nearly black (#09090b)
  textSecondary: string;     // Medium muted gray (#52525b)
  textMuted: string;         // Light muted (#71717a)
  bgPage: string;            // Crisp off-white / light neutral (#fafafa)
  bgCard: string;            // Pure white card surface (#ffffff)
  bgCardSubtle: string;      // Slightly tinted card background (#f4f4f5)
  borderColor: string;       // Restrained subtle border (#e4e4e7)
  borderStrong: string;
  codeBg: string;            // Deep charcoal for code blocks (#18181b)
  codeText: string;          // Light monospaced code text (#fafafa)
  fontFamily: string;
  fontMono: string;
  borderRadius: number;      // e.g. 8
}

export const defaultBrandTheme: BrandTheme = {
  primary: "#18181b",        // Sleek developer obsidian black accent
  primaryHover: "#27272a",
  primaryLight: "#f4f4f5",
  textPrimary: "#09090b",    // Deep charcoal
  textSecondary: "#52525b",  // Neutral zinc secondary
  textMuted: "#71717a",
  bgPage: "#fafafa",         // Clean neutral
  bgCard: "#ffffff",
  bgCardSubtle: "#f4f4f5",
  borderColor: "#e4e4e7",
  borderStrong: "#d4d4d8",
  codeBg: "#18181b",
  codeText: "#38bdf8",
  fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace",
  borderRadius: 8,
};
