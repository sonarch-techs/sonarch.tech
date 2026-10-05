"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#040404]/85 backdrop-blur-md border-b border-[#1f1f1f] py-3 shadow-xl shadow-black/60"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden flex items-center justify-center border border-[#1f1f1f] bg-[#1f1f1f]/60 group-hover:border-[#00c896]/50 transition-colors">
            <Image
              src="/logo-vf.png"
              alt={`${siteConfig.name} Logo`}
              width={36}
              height={36}
              className="object-contain w-full h-full p-0.5 group-hover:scale-105 transition-transform duration-200"
              priority
            />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#00c896] transition-colors">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-neutral-400 hover:text-[#00c896] transition-colors duration-200 cursor-pointer"
            >
              {link.title}
            </a>
          ))}
        </nav>

        {/* Primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="inline-flex items-center gap-2 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-[#00c896]/15 hover:shadow-[#00c896]/25 transition-all duration-200 group cursor-pointer"
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-[#1f1f1f] bg-[#1f1f1f]/50 text-neutral-300 hover:text-[#00c896] hover:border-[#00c896]/40 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#040404] border-b border-[#1f1f1f] px-5 py-5 flex flex-col gap-3.5 shadow-2xl">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-neutral-300 hover:text-[#00c896] py-1.5 transition-colors cursor-pointer"
            >
              {link.title}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer"
          >
            <span>Start Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}