"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Layers,
  Code2,
  BookOpen,
  Send,
  ArrowRight,
  X,
  MessageCircle,
} from "lucide-react";

interface ActionItem {
  name: string;
  category: "Navigation" | "Capabilities" | "Action";
  href: string;
  icon: React.ElementType;
}

const COMMAND_ACTIONS: ActionItem[] = [
  { name: "Production Case Studies", category: "Navigation", href: "/work", icon: Layers },
  { name: "Capability Matrix (Services)", category: "Navigation", href: "/services", icon: Code2 },
  { name: "Technical Insights & Publications", category: "Navigation", href: "/insights", icon: BookOpen },
  { name: "Scope Web Application", category: "Capabilities", href: "/services/website-development", icon: Code2 },
  { name: "Configure AI Automation Setup", category: "Capabilities", href: "/services/ai-automation-setup", icon: Code2 },
  { name: "Deploy 24/7 AI Chatbot", category: "Capabilities", href: "/services/ai-chatbots", icon: Code2 },
  { name: "AEO & Organic Search Optimization", category: "Capabilities", href: "/services/seo-optimization", icon: Code2 },
  { name: "Launch Interactive Discovery Scope", category: "Action", href: "/#contact", icon: Send },
];

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = COMMAND_ACTIONS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    if (href.startsWith("/#")) {
      const anchor = href.replace("/", "");
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(href);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 dark:bg-[#040404]/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-xl bg-white dark:bg-[#040404] border border-neutral-200 dark:border-[#1f1f1f] rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black overflow-hidden z-10 font-mono transition-colors duration-200"
          >
            {/* Search Input Bar */}
            <div className="px-4 py-3.5 border-b border-neutral-200 dark:border-[#1f1f1f] flex items-center gap-3 bg-neutral-50 dark:bg-[#141414]/50">
              <Search className="w-4 h-4 text-[#008763] dark:text-[#00c896]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to route, service spec, or case study..."
                className="w-full bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filtered Action List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500">
                  No matching systems found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(item.href)}
                      className="w-full text-left p-3 rounded-xl border border-transparent hover:border-neutral-200 dark:hover:border-[#1f1f1f] hover:bg-neutral-100 dark:hover:bg-[#141414] flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-[#1f1f1f] flex items-center justify-center text-neutral-600 dark:text-neutral-400 group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white font-medium block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 block">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600 group-hover:text-[#008763] dark:group-hover:text-[#00c896] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Strip */}
            <div className="px-4 py-2.5 border-t border-neutral-200 dark:border-[#1f1f1f] bg-neutral-50 dark:bg-[#0c0c0c] flex items-center justify-between text-[10px] text-neutral-500">
              <div className="flex items-center gap-3">
                <span>[ESC] Close</span>
                <span>[↑↓] Navigate</span>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#008763] dark:text-[#00c896] hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}