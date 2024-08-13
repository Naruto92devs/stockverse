import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stockverse",
  description: "Unlock the potential of intelligent investing with StockVerse.ai. We specialize in providing expert stock picks tailored to your investment goals. Our advanced AI-driven algorithms and seasoned financial analysts work together to bring you data-driven insights and investment strategies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
