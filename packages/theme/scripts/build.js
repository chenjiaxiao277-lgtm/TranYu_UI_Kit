import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const colorTokens = {
  primary: '#5E5CE6',
  primaryLight: '#7B7AF3',
  primaryDark: '#4845B8',
  neutral0: '#FFFFFF',
  neutral50: '#F8F8FA',
  neutral100: '#F0F0F3',
  neutral200: '#E8E8ED',
  neutral300: '#DCDCE3',
  neutral400: '#BCBCC8',
  neutral500: '#9C9CA8',
  neutral600: '#7C7C88',
  neutral700: '#5C5C64',
  neutral800: '#3C3C40',
  neutral900: '#1C1C20',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  disabled: '#D1D5DB',
  error: '#DC2626',
};

const radiusTokens = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
};

const spacingTokens = {
  0: '0', 1: '2px', 2: '4px', 3: '6px', 4: '8px', 5: '12px', 6: '16px', 7: '20px',
  8: '24px', 9: '32px', 10: '40px', 11: '48px', 12: '56px', 13: '64px', 14: '72px', 15: '80px',
};

const shadowTokens = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

const motionTokens = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slowest: '500ms',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
};

function generateCSSVariables() {
  let css = ':root {\n';
  Object.entries(colorTokens).forEach(([key, value]) => css += `  --tr-color-${key}: ${value};\n`);
  Object.entries(radiusTokens).forEach(([key, value]) => css += `  --tr-radius-${key}: ${value};\n`);
  Object.entries(spacingTokens).forEach(([key, value]) => css += `  --tr-spacing-${key}: ${value};\n`);
  Object.entries(shadowTokens).forEach(([key, value]) => css += `  --tr-shadow-${key}: ${value};\n`);
  Object.entries(motionTokens).forEach(([key, value]) => css += `  --tr-motion-${key}: ${value};\n`);
  css += '}\n';
  return css;
}

const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

fs.writeFileSync(path.join(distDir, 'theme.css'), generateCSSVariables());
fs.writeFileSync(path.join(distDir, 'index.js'), `export { colorTokens, radiusTokens, spacingTokens, shadowTokens, motionTokens } from './tokens.js';\n`);
fs.writeFileSync(path.join(distDir, 'tokens.js'), `
export const colorTokens = ${JSON.stringify(colorTokens, null, 2)};
export const radiusTokens = ${JSON.stringify(radiusTokens, null, 2)};
export const spacingTokens = ${JSON.stringify(spacingTokens, null, 2)};
export const shadowTokens = ${JSON.stringify(shadowTokens, null, 2)};
export const motionTokens = ${JSON.stringify(motionTokens, null, 2)};
`);

console.log('✓ Theme tokens generated');
