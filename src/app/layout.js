// src/app/layout.js
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content="StockVerse Your Gateway to Informed Investing!" />
        <title>Stockverse</title>
      </head>
      <body className="bg-background w-[100%] mx-auto">
        <Providers>
          <NextThemesProvider>
            <ThemeProvider>
              <main className="w-[100%] h-[100%] ">
                <Navbar/>
                {children}
              </main>
            </ThemeProvider>
          </NextThemesProvider>
        </Providers>
      </body>
    </html>
  )
}
