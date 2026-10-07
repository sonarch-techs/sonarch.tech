"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Activity,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Send,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  tag: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Services", href: "#services", tag: "Capabilities", icon: Code2 },
  { name: "Why Choose Us", href: "#why-choose-us", tag: "Features", icon: Sparkles },
  { name: "Systems Architecture", href: "#systems", tag: "Pipelines", icon: Cpu },
  { name: "Case Studies", href: "#work", tag: "Production", icon: Layers },
  { name: "Technical Insights", href: "#insights", tag: "Publications", icon: Activity },
  { name: "Project Discovery", href: "#contact", tag: "Inbound", icon: Send },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Sleek Floating Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#040404]/80 backdrop-blur-md border-b border-[#1f1f1f]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#1f1f1f] bg-[#1f1f1f]/60 flex items-center justify-center group-hover:border-[#00c896]/50 transition-colors">
              <Image
                src="/logo-vf.png"
                alt="SONARCHTECH Logo"
                width={32}
                height={32}
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-white font-mono">
                SONARCH<span className="text-[#00c896]">TECH</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase -mt-0.5">
                Systems & AEO
              </span>
            </div>
          </Link>

          {/* Right Controls: Quick CTA + Slide Drawer Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Quick Action Button (Desktop) */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden sm:inline-flex items-center gap-2 bg-[#00c896]/10 hover:bg-[#00c896]/20 text-[#00c896] border border-[#00c896]/30 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all font-mono"
            >
              <span>Book Discovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Menu Drawer Toggle Button */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open Navigation Drawer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1f1f1f]/50 hover:bg-[#1f1f1f] text-neutral-200 hover:text-white border border-[#1f1f1f] hover:border-[#00c896]/40 transition-all font-mono text-xs font-semibold cursor-pointer group"
            >
              <span className="hidden sm:inline text-neutral-400 group-hover:text-neutral-200">
                MENU
              </span>
              <Menu className="w-4 h-4 text-[#00c896] group-hover:scale-110 transition-transform" />
            </button>

          </div>
        </div>
      </header>

      {/* 2. Slide-Over Backdrop & Right-Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop with Blur matching Admin Lead Drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-In Drawer Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative w-full max-w-sm sm:max-w-md bg-[#040404] border-l border-[#1f1f1f] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl z-10"
            >
              <div>
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#1f1f1f] mb-8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00c896] animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                      Navigation Matrix
                    </span>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl border border-[#1f1f1f] hover:bg-[#1f1f1f] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Primary Nav Links */}
                <nav className="space-y-2">
                  {NAV_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left p-3.5 rounded-xl border border-transparent hover:border-[#1f1f1f] hover:bg-[#1f1f1f]/40 flex items-center justify-between group transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-lg bg-[#1f1f1f] border border-[#1f1f1f] flex items-center justify-center text-[#00c896] group-hover:border-[#00c896]/40 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm sm:text-base font-semibold text-neutral-200 group-hover:text-white transition-colors block">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                              {item.tag}
                            </span>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-[#00c896] group-hover:translate-x-1 transition-all" />
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Direct Action Card inside Drawer */}
                <div className="mt-8 p-4 rounded-xl border border-[#00c896]/20 bg-[#00c896]/5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00c896] font-semibold mb-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Instant Project Initiation</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                    Have an upcoming web app or autonomous systems requirement? Submit your parameters directly.
                  </p>
                  <button
                    onClick={() => handleNavClick("#contact")}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-bold text-xs py-3 rounded-lg shadow-md shadow-[#00c896]/20 transition-all font-mono cursor-pointer"
                  >
                    <span>Launch Discovery Form</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-[#1f1f1f] mt-8 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>SonarchTech // 2026</span>
                  <Link
                    href="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 hover:text-[#00c896] transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              </div>

            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}