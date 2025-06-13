// src/app/layout.js
'use client';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShortFooter from '@/components/ShortFooter';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import UserProvider from './userProvider';
import DashboardProvider from './dashboardProvider';
import { MetadataProvider, useMetadata } from "@/context/MetadataContext";


const jsonld = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stockverse",
  "url": "https://stockverse.com/",
  "logo": "https://stockverse.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@stockverse.com",
    "contactType": "customer support"
  }
}

export default function RootLayout({ children }) {


  const pathname = usePathname();

  // Define routes where Navbar should be hidden
  const excludedNavbarRoutes = ['/stockverse-gpt', '/gpt', '/dashboard', '/login', '/register', '/', '/homepage', '/alerts', '/cadrenal', '/cvkd', '/newsletter', '/newsletter/alerts'];
  // Define routes where Footer should be hidden
  const excludedFooterRoutes = ['/stockverse-gpt', '/gpt', '/dashboard', '/login', '/register', '/', '/neovolta', '/cadrenal-page', '/stockversegpt-overview', '/help-center', '/homepage', '/alerts', '/return', '/cadrenal', '/reset_password', '/newsletter', '/newsletter/alerts'];
  // Define routes where Footer should be shown
  const includedShortFooterRoutes = ['/pricing', '/'];

  // Check if the current route is in the excluded routes
  const hideNavbar = excludedNavbarRoutes.includes(pathname);

  // Check if the current route is in the excluded routes
  const hideFooter = excludedFooterRoutes.includes(pathname);

  // Check if the current route is in the included routes
  const showShortFooter = includedShortFooterRoutes.includes(pathname);

  return (
    <MetadataProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.png" size="92*92" />
          <link rel="preload" href="/fonts/Syne-Bold.ttf" as="font" type="font/truetype" crossOrigin="anonymous" />

          <DynamicMetadata />

          {process.env.NODE_ENV === 'production' && (
            <>
              {/* <!-- Google Tag Manager --> */}
              <Script id="gtm-head" strategy="afterInteractive">
                {`
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-NKNBV87L');
                `}
              </Script>
              {/* <!-- End Google Tag Manager --> */}

              {/* <!-- Google tag (gtag.js) --> */}
              <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-PEDC750L6H`}></Script>
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
        
                  gtag('config', 'G-PEDC750L6H');
                  gtag('config', 'AW-16488126373');
                `}
              </Script>

            </>
          )}
        </head>
        <body className="bg-background w-[100%] mx-auto">
          <script type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonld),
            }}
          />
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKNBV87L"
              height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
            <UserProvider>
              <DashboardProvider>
                  <main className="w-[100%] min-h-[100vh] flex flex-col bg-primaryBg">
                    <div className='w-full bg-primaryBg'>
                      {!hideNavbar && <Navbar />}
                    </div>
                    {children}
                    {!hideFooter && <Footer />}
                    {showShortFooter && <ShortFooter />}
                  </main>
              </DashboardProvider>
            </UserProvider>
        </body>
      </html>
    </MetadataProvider>
  )
}

function DynamicMetadata() {
  const { metadata } = useMetadata();
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {/* <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.schema) }} /> */}
    </>
  );
}