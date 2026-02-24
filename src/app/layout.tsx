import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accverse - A Pet-Centric Social Network",
  description: "A social network exclusively for pets and their owners. Content is written from the animal's perspective - no human selfies, just pure animal love.",
  keywords: ["Accverse", "pets", "social network", "animals", "dogs", "cats", "pet owners", "pet care"],
  authors: [{ name: "Accverse Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Accverse - A Pet-Centric Social Network",
    description: "Where animals take center stage. A calm, animal-focused social network.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accverse - A Pet-Centric Social Network",
    description: "Where animals take center stage. A calm, animal-focused social network.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
