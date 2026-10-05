import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
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
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} dark scroll-smooth h-full`}
    >
      <body
        className={`${inter.className} bg-background text-foreground antialiased min-h-screen flex flex-col overflow-x-clip selection:bg-[#00c896]/20 selection:text-[#00c896]`}
      >
        <Navbar />
        <main className="flex-grow pt-16 sm:pt-20 lg:pt-24 overflow-x-clip">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}