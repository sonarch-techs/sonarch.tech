import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#040404] text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info & Availability Badge */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#1f1f1f] bg-[#1f1f1f]/60 flex items-center justify-center">
                <Image
                  src="/logo-vf.png"
                  alt={`${siteConfig.name} Logo`}
                  width={32}
                  height={32}
                  className="object-contain w-full h-full p-0.5"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#00c896] transition-colors">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-6">
              Engineering high-performance web applications, autonomous revenue pipelines, and AI Engine Optimization (AEO) frameworks.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1f1f1f] bg-[#1f1f1f]/60 text-xs font-medium text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#00c896] animate-pulse" />
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-[#00c896] transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00c896]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Inquiries */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Inquiries
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="block text-xs text-neutral-500 font-medium">Headquarters</span>
                <span className="text-neutral-300">Global / Remote First</span>
              </li>
              <li>
                <span className="block text-xs text-neutral-500 font-medium">Domain</span>
                <a
                  href={siteConfig.url}
                  className="text-neutral-300 hover:text-[#00c896] transition-colors"
                >
                  sonarch.tech
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href={siteConfig.contactLink}
                  className="inline-flex items-center gap-1.5 text-sm text-[#00c896] hover:text-[#00b285] font-medium transition-colors"
                >
                  <span>Book a discovery session</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-12 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-[#00c896]/80 font-mono">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}