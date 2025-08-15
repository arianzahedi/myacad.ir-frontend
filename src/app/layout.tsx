// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css"; // We need this to import our global styles

// Define the custom font
const vazirFont = localFont({
  src: '../../fonts/Vazirmatn[wght].woff2',
  display: 'swap',
  variable: '--font-vazir' // This creates a CSS variable for our font
});

export const metadata: Metadata = {
  title: "My Acad",
  description: "Your new career path starts here",
};

// Define the RootLayout component which accepts 'children' as a prop
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      {/* We apply the CSS variable to the body so all children can use it */}
      <body className={vazirFont.variable}>
        {children}
      </body>
    </html>
  );
}