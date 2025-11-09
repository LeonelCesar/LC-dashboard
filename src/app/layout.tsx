import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LC Dashboard",
    template: "%s | LC Dashboard",
  },
  description: "Dashboard moderna para freelancers e gestão pessoal",
  icons: {
    icon: "/favicon.ico",
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          bg-background text-foreground
          min-h-screen antialiased transition-colors duration-300
        `}
      >
        <div className="flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
