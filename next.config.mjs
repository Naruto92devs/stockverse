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
    // productionBrowserSourceMaps: true,
};

export default nextConfig;
