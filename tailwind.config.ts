import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#1f1f1f",
        deep: "#252525",
        surface: "#1d1d1d",
        surface2: "#313131",
        line: "#5a5a5a",
        ink: "#FBF1E7",
        muted: "#707070",
        gold: {
          DEFAULT: "#F0B429",
          bright: "#FFCE54",
          dim: "#8A6414"
        },
        ember: {
          DEFAULT: "#D97B3F",
          bright: "#F0A868"
        },
        lime: {
          DEFAULT: "#8FBF5C",
          dim: "#6B9440"
        },
        danger: "#a7a7a7"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(240, 180, 41, 0.55)",
        "glow-ember": "0 0 24px -4px rgba(217, 123, 63, 0.5)",
        "glow-lime": "0 0 24px -6px rgba(143, 191, 92, 0.5)"
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "80%": { transform: "scale(1.8)", opacity: "0" },
          "100%": { transform: "scale(1.8)", opacity: "0" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        pulseRing: "pulseRing 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite"
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 20% 20%, rgba(240,180,41,0.14), transparent 40%), radial-gradient(circle at 80% 0%, rgba(217,123,63,0.10), transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;
