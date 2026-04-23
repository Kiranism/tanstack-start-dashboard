/**
 * Font configuration for Fontsource-based font loading.
 * Fonts are loaded via CSS @import in globals.css.
 * Theme CSS files reference fonts by their family names.
 *
 * No fontVariables class string is needed since fonts are loaded at the CSS level.
 */

export const fonts = {
  sans: { family: 'Geist Variable', variable: '--font-sans' },
  mono: { family: 'Geist Mono Variable', variable: '--font-mono' },
  inter: { family: 'Inter Variable', variable: '--font-inter' },
  dmSans: { family: 'DM Sans Variable', variable: '--font-dm-sans' },
  instrument: { family: 'Instrument Sans Variable', variable: '--font-instrument' },
  mullish: { family: 'Mulish Variable', variable: '--font-mullish' },
  outfit: { family: 'Outfit Variable', variable: '--font-outfit' },
  playfairDisplay: { family: 'Playfair Display Variable', variable: '--font-playfair-display' },
  merriweather: { family: 'Merriweather', variable: '--font-merriweather' },
  architectsDaughter: { family: 'Architects Daughter', variable: '--font-architects-daughter' },
  firaCode: { family: 'Fira Code Variable', variable: '--font-fira-code' },
  jetBrainsMono: { family: 'JetBrains Mono Variable', variable: '--font-jetbrains-mono' },
  notoSansMono: { family: 'Noto Sans Mono Variable', variable: '--font-noto-mono' },
  spaceMono: { family: 'Space Mono', variable: '--font-space-mono' }
} as const;

// Legacy export - no longer needed since fonts are CSS-level
export const fontVariables = '';
