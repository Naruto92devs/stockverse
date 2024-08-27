/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: 'class', // Enable dark mode
  theme: {
    colors: {
        themeColor: "var(--theme-color)",
        svgColor: "var(--svg-color)",
        oppositeSvgColor: "var(--opposite-svg-color)",
        mobNavBg: "rgba(var(--mob-nav-bg))",
        mobNavLink: "rgba(var(--mob-nav-link))",
        primaryColor: "rgba(var(--primary-color))",
        secondaryColor: "rgba(var(--secondary-color))",
        primaryText: "rgba(var(--primary-text))",
        primaryTextHover: "rgba(var(--primary-text-hover))",
        primaryButtonText: "rgba(var(--primary-button-text))",
        primaryButtonBg: "rgba(var(--primary-button-bg))",
        background: "rgba(var(--background))",
      },
    },
    plugins: [],
    darkMode: 'class',
};
