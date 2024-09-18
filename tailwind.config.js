/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode
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
      primaryHeading: "rgba(var(--primary-heading-color))",
      secondaryHeading: "rgba(var(--secondary-heading-color))",
      submit: "rgba(var(--submit-button))",
      article: "rgba(var(--article-button))",
      articleNeutral: "rgba(var(--article-neutral-button))",
      footerBg: "rgba(var(--footer-bg))",
      buy: "rgba(var(--buy-color))",
      sell: "rgba(var(--sell-color))",
      background: "rgba(var(--background))",
    },
    extend: {
      fontFamily: {
        sansRegular: ['GeneralSans-Regular', 'sans-serif'],
        sansBold: ['GeneralSans-Bold', 'sans-serif'],
        sansMedium: ['GeneralSans-Medium', 'sans-serif'],
        sansExtralight: ['GeneralSans-Extralight', 'sans-serif'],
        sansLight: ['GeneralSans-Light', 'sans-serif'],
        sansSemibold: ['GeneralSans-Semibold', 'sans-serif'],
        sansItalic: ['GeneralSans-Italic', 'sans-serif'],
        sansBoldItalic: ['GeneralSans-BoldItalic', 'sans-serif'],
        sansMediumItalic: ['GeneralSans-MediumItalic', 'sans-serif'],
        sansSemiboldItalic: ['GeneralSans-SemiboldItalic', 'sans-serif'],
        sansVariable: ['GeneralSans-Variable', 'sans-serif'],
        sansVariableItalic: ['GeneralSans-VariableItalic', 'sans-serif'],
      },
      backgroundImage: {
        'heroBg': "url('/images/main_bg.jpg')",
        'loginBg': "url('/images/login_bg.jpg')",
        'newsBg': "url('/images/news_bg.jpg')",
        'articleBg': "url('/images/Image_not_available.png')",
        'stocksBg': "url('/images/stocks_bg.jpg')",
        // 'heroBgDark': "url('/images/main_bg_1.jpg')",
        // 'heroGradient': 'linear-gradient(135deg, #f3f4f6 0%, #e0e4ff 50%, #d9d7f1 100%)',
        'heroGradientDark': 'linear-gradient(135deg, #1e3a5f 0%, #1f4e59 50%, #342e56 100%)',
      },
    },
  },
  plugins: [],
};