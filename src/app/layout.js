// src/app/layout.js
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
