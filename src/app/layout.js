// src/app/layout.js
import Layout from "@/components/Layout"; // Adjust the path if needed
import './globals.css'; // Ensure global CSS is included

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="light">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
