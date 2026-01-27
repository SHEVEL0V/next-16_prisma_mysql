/** @format */

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const geistRoboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--roboto-font",
});

export const metadata: Metadata = {
  title: "UI ⚙",
  description: "Project Table UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistRoboto.variable}  antialiased bg-[url('/img/bg.jpeg')] dark:text-white  `}
      >
        {children}
      </body>
    </html>
  );
}
