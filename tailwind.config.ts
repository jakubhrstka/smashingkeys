import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            background: "var(--color-background)",
            primary: "var(--color-primary)",
            caret: "var(--color-caret)",
            secondary: "var(--color-secondary)",
            tertiary: "var(--color-tertiary)",
            text: "var(--color-text)",
            error: "var(--color-error)",
            errorAddon: "var(--color-error-addon)",
            errorVibrant: "var(--color-error-vibrant)",
            errorVibrantAddon: "var(--color-error-vibrant-addon)",
         },
         keyframes: {
            pulse: {
               "0%, 100%": { opacity: "0" },
               "50%": { opacity: "100%" },
            },
         },
         animation: {
            pulse: "pulse 1200ms ease-in-out infinite",
         },
      },
   },
   plugins: [],
};
export default config;
