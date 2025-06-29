import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Boostn - EHC Koenigsbrunn | Crowdfunding Platform",
  description: "Support EHC Koenigsbrunn through sponsorship packages and donations. Help our ice hockey club achieve excellence on and off the ice.",
  keywords: "EHC Koenigsbrunn, ice hockey, sponsorship, crowdfunding, donations, sports club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
