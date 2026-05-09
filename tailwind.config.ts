import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        // Warm luxury palette — soft whites, warm ivory, champagne chrome.
        bone: "#F4EFE6",
        ivory: "#FAF6EC",
        porcelain: "#FFFFFF",
        graphite: "#1F1B16",
        ink: "#0E0B07",
        chrome: {
          50: "#F7F4EE",
          100: "#EDE7DA",
          200: "#D8CFBE",
          300: "#B8AC95",
          400: "#8E826D",
          500: "#6B6253",
          600: "#4F483D",
          700: "#352F27",
          800: "#221F1A",
          900: "#0E0B07",
        },
        // Brushed gold / champagne — primary accent.
        champagne: {
          50: "#FBF6E9",
          100: "#F4EAC9",
          200: "#E8D6A0",
          300: "#D7BB72",
          400: "#BE9A4D",
          500: "#9D7C39",
          600: "#7A5F2B",
          700: "#5C4720",
          800: "#3E3017",
          900: "#241B0D",
        },
        // Retained for occasional cool counterpoint, used sparingly.
        ether: {
          50: "#F4F7FA",
          100: "#E5ECF2",
          200: "#CFD8E2",
          300: "#A6B5C6",
          400: "#7B8DA4",
          500: "#586B85",
          600: "#404F66",
          700: "#2D384B",
          800: "#1E2632",
          900: "#11171F",
        },
        warm: {
          rose: "#EBD3C7",
          cream: "#F4E9D5",
          taupe: "#D7C8B3",
          champagne: "#E5D2A8",
        },
      },
      backgroundImage: {
        "high-key":
          "radial-gradient(120% 80% at 50% 0%, #FFFFFF 0%, #FAF6EC 55%, #EDE7DA 100%)",
        "ivory-veil":
          "linear-gradient(180deg, #FFFFFF 0%, #FAF6EC 40%, #F4EFE6 100%)",
        "champagne":
          "linear-gradient(135deg, #FBF6E9 0%, #F4EAC9 35%, #E8D6A0 70%, #FBF6E9 100%)",
        "chrome-sweep":
          "linear-gradient(110deg, #FFFFFF 0%, #F4EAC9 30%, #FFFFFF 55%, #D8CFBE 75%, #FFFFFF 100%)",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.7) inset, 0 0 0 1px rgba(255,255,255,0.45) inset, 0 24px 60px -28px rgba(54,42,22,0.16)",
        "glass-hover":
          "0 1px 0 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(255,255,255,0.6) inset, 0 36px 90px -32px rgba(54,42,22,0.24)",
        "halo": "0 0 50px -12px rgba(190,154,77,0.32)",
        "editorial":
          "0 30px 80px -40px rgba(31,27,22,0.28), 0 8px 24px -16px rgba(31,27,22,0.16)",
      },
      animation: {
        "shimmer": "shimmer 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
