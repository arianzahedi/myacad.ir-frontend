// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const vazirFont = localFont({
  src: '../../fonts/Vazirmatn[wght].woff2',
  display: 'swap',
  variable: '--font-vazir'
});

export const metadata: Metadata = {
  title: "My Acad",
  description: "Your new career path starts here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>{children}</body>
    </html>
  );
}