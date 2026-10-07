import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import { FloatingWidgets } from "@/components/floating-widgets";
import { GraphGridBackground } from "@/components/ui/graph-grid-background";
import { TelemetryStatusBar } from "@/components/telemetry-status-bar";
import { CommandMenu } from "@/components/command-menu";

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

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sonarch.tech"),
  title: {
    default: `${siteConfig.name} | Web Apps, Systems Design & SEO/AEO Architecture`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "SONARCHTECH is a high-performance tech agency engineering full-stack web applications, autonomous revenue pipelines, and AI Engine Optimization (AEO) frameworks.",
  keywords: [
    "Web Application Development",
    "Systems Design",
    "AEO Architecture",
    "AI Engine Optimization",
    "Next.js Agency",
    "Supabase Lead Automation",
    "Enterprise Lead Funnels",
    "High Performance Systems",
  ],
  authors: [{ name: "SONARCHTECH Team", url: "https://sonarch.tech" }],
  creator: "SONARCHTECH",
  publisher: "SONARCHTECH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sonarch.tech",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Web Apps, Systems Design & SEO/AEO`,
    description:
      "We architect web applications and autonomous systems that command search & high-ticket conversion.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Systems & Web Architecture`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Web Apps, Systems Design & SEO/AEO`,
    description:
      "High-performance digital products, autonomous lead pipelines, and AI Engine Optimization.",
    images: ["/logo.png"],
    creator: "@sonarchtech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#040404",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} font-sans bg-[#040404] text-foreground antialiased min-h-screen flex flex-col selection:bg-[#00c896]/20 selection:text-[#00c896] overflow-x-clip relative`}
      >
        {/* 1. Global Architectural Coordinate Grid (Fixed Background at z-0) */}
        <GraphGridBackground />

        {/* 2. Floating Obsidian Header (Fixed at z-40) */}
        <Navbar />

        {/* 3. Primary Content Stream (Layered at z-10 with zero artificial offset) */}
        <main className="relative sm:pt-12 lg:pt-18  z-10 flex-grow flex flex-col w-full overflow-x-clip">
          {children}
        </main>
        {/* Live Edge Telemetry Bar */}
        <TelemetryStatusBar />
        {/* 4. Global Footer */}
        <Footer />

        {/* 5. Floating Telemetry Widgets (WhatsApp & AI Chatbot at z-50) */}
        <FloatingWidgets />
        <CommandMenu />
      </body>
    </html>
  );
}