"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Do not render the public footer on admin portal routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-neutral-200 dark:border-[#1f1f1f] bg-slate-50/60 dark:bg-[#040404]/20 backdrop-blur-md text-neutral-600 dark:text-neutral-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info & Availability Badge */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-neutral-200 dark:border-[#1f1f1f] bg-white dark:bg-[#1f1f1f]/60 flex items-center justify-center shadow-sm dark:shadow-none">
                <Image
                  src="/logo-vf.png"
                  alt={`${siteConfig.name} Logo`}
                  width={32}
                  height={32}
                  className="object-contain w-full h-full p-0.5"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors font-mono">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed mb-6 font-mono">
              Engineering high-performance web applications, autonomous revenue pipelines, and AI Engine Optimization (AEO) frameworks.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-[#1f1f1f] bg-white dark:bg-[#1f1f1f]/60 text-xs font-medium text-neutral-700 dark:text-neutral-300 font-mono shadow-sm dark:shadow-none">
              <span className="w-2 h-2 rounded-full bg-[#008763] dark:bg-[#00c896] animate-pulse" />
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white font-semibold font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-mono">
              {siteConfig.navLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-[#008763] dark:hover:text-[#00c896] transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#008763] dark:text-[#00c896]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Inquiries */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white font-semibold font-mono mb-4">
              Inquiries
            </h4>
            <ul className="space-y-2.5 text-sm font-mono">
              <li>
                <span className="block text-xs text-neutral-500 font-medium">Headquarters</span>
                <span className="text-neutral-800 dark:text-neutral-300">Global / Remote First</span>
              </li>
              <li>
                <span className="block text-xs text-neutral-500 font-medium">Domain</span>
                <a
                  href={siteConfig.url}
                  className="text-neutral-800 dark:text-neutral-300 hover:text-[#008763] dark:hover:text-[#00c896] transition-colors"
                >
                  sonarch.tech
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href={siteConfig.contactLink}
                  className="inline-flex items-center gap-1.5 text-sm text-[#008763] hover:text-[#006f52] dark:text-[#00c896] dark:hover:text-[#00b285] font-semibold transition-colors"
                >
                  <span>Book a discovery session</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Version */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-900 dark:hover:text-neutral-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-neutral-900 dark:hover:text-neutral-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-[#008763] dark:text-[#00c896]/80 font-mono font-semibold">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}