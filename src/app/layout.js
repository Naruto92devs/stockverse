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
      <body className="bg-background w-full h-full mx-auto lg:container max-xl:px-12">
        <Providers>
          <main className="w-full h-full ">
            <Navbar/>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
