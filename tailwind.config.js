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
      // new design varialbles
      white: "rgba(var(--white))",
      black: "rgba(var(--black))",
      buy: "rgba(var(--buy-color))",
      sell: "rgba(var(--sell-color))",
      primaryMain: "rgba(var(--primary-main))",
      heading: "rgba(var(--heading-main))",
      primaryTextColor: "rgba(var(--primary-text))",
      primaryBg: "rgba(var(--primary-bg))",
      dashboardBg: "rgba(var(--dasboard-bg))",
      darkBlue: "rgba(var(--dark-blue))",
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
        
        MontserratSemibold : ['Montserrat-semibold'],
        MontserratRegular : ['Montserrat-regular'],
        MontserratBold : ['Montserrat-bold'],
        MontserratMI : ['Montserrat-mi'],
        MontserratMedium : ['Montserrat-Medium'],
        syneBold : ['syne-Bold'],
      },
      backgroundImage: {
        'loaderBg': "url('/images/loader_bg.jpg')",
        'stockversegptBg': "url('/images/stockversegpt_bg.jpg')",
        'heroBg': "url('/images/hero_bg.png')",
        'searchBg': "url('/images/features_search_bg.png')",
        'realtimeBg': "url('/images/features_realtime_bg.png')",
        'joinBg': "url('/images/join_bg.jpg')",
        'contactBg': "url('/images/contact_bg.jpg')",
        'contactPowerSectionBg': "url('/images/powerful_bg.png')",
        'pricingBg': "url('/images/pricing_bg.jpg')",
        // background gradients
        'profileBg': 'radial-gradient(100% 100% at 50% 0%, #8B77FF 0%, #634FF7 100%)',
        'upgradeBg': 'linear-gradient(121.78deg, #2713A5 7.6%, #634FF7 92.4%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
        addUtilities({
            '.scrollbar-hide': {
                /* Firefox */
                'scrollbar-width': 'none',
                /* Safari and Chrome */
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            },
        });
    },
],
};