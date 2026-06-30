const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ibda: {
          bg: "#050505",
          surface: "#11100E",
          panel: "#171512",
          accent: "#8E7CFF",
          gold: "#D7B46A",
          cyan: "#60E6D2",
          ember: "#F06A3D",
          border: "rgba(215, 180, 106, 0.16)",
        }
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
