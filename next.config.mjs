/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https', // Protocol used by the domain (http or https)
              hostname: 'img.logo.dev', // Replace with your domain
              port: '', // Leave empty if no specific port is needed
              pathname: '/**', // Matches any path after the domain
            },
        ]  // Add 'logo.clearbit.com' to the list of allowed domains
    },
    async redirects() {
        return [
          {
            source: '/ipo-calendar', // URL to be redirected
            destination: '/', // URL to redirect to
            permanent: false, // Set to true for permanent redirects (301), false for temporary (307)
          },
          {
            source : '/gainers&losers',
            destination : '/',
            permanent : false,
          },
          {
            source : '/news',
            destination : '/',
            permanent : false,
          },
          {
            source : '/level2',
            destination : '/',
            permanent : false,
          },
          {
            source : '/financials',
            destination : '/',
            permanent : false,
          },
          {
            source : '/articles/cvkd',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/META',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/AMZN',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/MSFT',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/TSM',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/UNH',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/NVDA',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/GOOG',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/TSLA',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/AXP',
            destination : '/',
            permanent : false,
          },
          {
            source : '/stocks/V',
            destination : '/',
            permanent : false,
          },
          {
            source : '/ipo',
            destination : '/',
            permanent : false,
          },
          {
            source : '/earnings-calendar',
            destination : '/dashboard?view=earnings_calendar',
            permanent : false,
          },
        ];
      },
    
};

export default nextConfig;
