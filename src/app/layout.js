// src/app/layout.js
'use client';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import UserProvider from './userProvider';
import DashboardProvider from './dashboardProvider';
import { useState,useEffect } from 'react';
import { MetadataProvider, useMetadata } from "@/context/MetadataContext";
import { GoogleReCaptchaProvider,useGoogleReCaptcha } from 'react-google-recaptcha-v3';


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
  const excludedNavbarRoutes = ['/stockverse-gpt', '/gpt', '/dashboard', '/login', '/register', '/','/homepage', '/alerts'];
  // Define routes where Footer should be hidden
  const excludedFooterRoutes = ['/stockverse-gpt', '/gpt', '/dashboard', '/login', '/register', '/', '/neovolta', '/cadrenal-page', '/stockversegpt-overview', '/help-center', '/homepage', '/alerts'];

  // Check if the current route is in the excluded routes
  const hideNavbar = excludedNavbarRoutes.includes(pathname);

  // Check if the current route is in the excluded routes
  const hideFooter = excludedFooterRoutes.includes(pathname);

  return (
    <MetadataProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* <meta name="description" content="Discover real-time stock data, expert financial analysis, and market insights on Stockverse. Stay ahead of the market with live updates, in-depth stock news, IPO calendars, and personalized tools to help you make informed investment decisions." /> */}
          <link rel="icon" href="/favicon.png" size="92*92" />
          {/* <title>Stockverse</title> */}
          <DynamicMetadata />
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
        </head>
        <body className="bg-background w-[100%] mx-auto">
        <script
          type="application/ld+json"
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
          <GoogleReCaptchaProvider reCaptchaKey="6LdxE-IqAAAAAJMrNxeSDAMAufTfPFoyi77Mpglo">
                <UserProvider>
                  <DashboardProvider>
                    <ReCaptchaWrapper>
                      <main className="w-[100%] min-h-[100vh] flex flex-col bg-primaryBg">
                        <div className='w-full bg-primaryBg'>
                          {!hideNavbar && <Navbar />}
                        </div>
                          {children}
                          {!hideFooter && <Footer />}
                      </main>
                    </ReCaptchaWrapper>
                  </DashboardProvider>
                </UserProvider>
          </GoogleReCaptchaProvider>
          {/* <Script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=SNDh4K"></Script> */}
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


function ReCaptchaWrapper({ children }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!executeRecaptcha) {
      return console.log("google recaptcha token not yet provided")
    };

    const fetchReCaptchaToken = async () => {
      const recaptchaToken = await executeRecaptcha("layout_load");
      setToken(recaptchaToken);
      const res = await fetch(`${process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END}/google-recaptcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaToken }),
      });
  
      // Optionally, handle the response from your backend
      const data = await res.json();
      if (res.ok) {
        console.log("Verification Score:", data.score);
      } else {
        console.error("Captcha verification failed:", data.message);
      }
    };

    fetchReCaptchaToken();

    const intervalId = setInterval(() => {
      fetchReCaptchaToken();
    }, 1 * 60 * 1000); // Runs every 5 minutes
  
    return () => clearInterval(intervalId);
  }, [executeRecaptcha]);

  return <>{children}</>;
}