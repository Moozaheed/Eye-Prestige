import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EYE PRESTIGE -- Modern Eyewear for Everyday Icons",
  description:
    "Premium eyeglasses and sunglasses in Bangladesh. Sunglasses, Optical, Bluecut, Night Drive, Day Wear, and 3 In 1 frames.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
