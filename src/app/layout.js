// src/app/layout.js
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content="StockVerse Your Gateway to Informed Investing!" />
        <title>Stockverse</title>
      </head>
      <body className="bg-background w-[100%] h-[100%] mx-auto px-6 xl:container max-xl:px-3">
        <Providers>
          <main className="w-[100%] h-[100%] ">
            <Navbar/>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
