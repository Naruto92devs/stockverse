// src/app/layout.js
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="description" content="Discover real-time stock data, expert financial analysis, and market insights on Stockverse. Stay ahead of the market with live updates, in-depth stock news, IPO calendars, and personalized tools to help you make informed investment decisions." />
        <link rel="icon" href="/favicon.png" size="92*92" />
        <title>Stockverse</title>
        {/* Google Tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PEDC750L6H"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PEDC750L6H');
              gtag('config', 'AW-16488126373');
            `,
          }}
        />
      </Head>
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
      </body>
    </html>
  )
}
