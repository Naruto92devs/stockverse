// src/app/layout.js
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Footer from '@/components/Footer';
import Script from 'next/script';
import KlaviyoScriptLoader from '@/components/KlaviyoScriptLoader';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content="Discover real-time stock data, expert financial analysis, and market insights on Stockverse. Stay ahead of the market with live updates, in-depth stock news, IPO calendars, and personalized tools to help you make informed investment decisions." />
        <link rel="icon" href="/favicon.png" size="92*92" />
        <title>Stockverse</title>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-PEDC750L6H`}></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {
            `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-PEDC750L6H');
            gtag('config', 'AW-16488126373');
            `
          }
        </Script>
      </head>
      <body className="bg-background w-[100%] mx-auto">
        <Providers>
          <NextThemesProvider>
            <ThemeProvider>
              <main className="w-[100%] min-h-[100vh] flex flex-col">
                <Navbar/>
                {children}
                <Footer/>
              </main>
            </ThemeProvider>
          </NextThemesProvider>
        </Providers>
        <KlaviyoScriptLoader/>
      </body>
    </html>
  )
}
