"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, CheckCircle2, Sparkles, MessageCircle, ArrowUpRight } from "lucide-react";

interface StructuredMessage {
  id: string;
  role: "user" | "assistant";
  message: string;
  keyPoints?: string[];
  suggestedReplies?: string[];
}

export function FloatingWidgets() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isBotHovered, setIsBotHovered] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<StructuredMessage[]>([
    {
      id: "initial",
      role: "assistant",
      message:
        "Hey! I'm Sonar from SONARCHTECH. Tell me about your project idea, or ask how we can bring it to life.",
      keyPoints: [
        "High-level project roadmaps",
        "Fast Next.js & mobile delivery",
      ],
      suggestedReplies: [
        "I have a web app idea",
        "How fast can you build it?",
        "What are your contact details?",
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20SONARCHTECH%2C%20I%27d%20like%20to%20discuss%20a%20project.`;

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Lock background scroll when chat modal is open
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

  // Do not render floating chat or WhatsApp buttons on admin views
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: StructuredMessage = {
      id: Date.now().toString(),
      role: "user",
      message: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.message,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "System unreachable");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          message: data.message || "I'm here to help plan your project. What would you like to build?",
          keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints : [],
          suggestedReplies: Array.isArray(data.suggestedReplies) ? data.suggestedReplies : [],
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          message: err.message || "Something went wrong! You can reach us directly on WhatsApp or book a discovery call.",
          suggestedReplies: ["Open WhatsApp", "Book discovery"],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const scrollToContact = () => {
    setIsOpen(false);
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Stacked Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Chatbot Trigger with Hover Pill */}
        <div
          className="relative flex items-center justify-end"
          onMouseEnter={() => setIsBotHovered(true)}
          onMouseLeave={() => setIsBotHovered(false)}
        >
          {/* Animated Hover Pill */}
          <AnimatePresence>
            {isBotHovered && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                onClick={() => setIsOpen(true)}
                className="absolute right-16 px-4 py-2 rounded-full border border-neutral-200 dark:border-[#1f1f1f] bg-white/95 dark:bg-[#040404]/95 backdrop-blur-md shadow-xl shadow-black/10 dark:shadow-black/80 flex flex-col items-start cursor-pointer select-none whitespace-nowrap transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008763] dark:bg-[#00c896] animate-pulse" />
                  <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono tracking-wide leading-tight">
                    AI Chatbot
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono leading-tight pl-3">
                  Ask me anything
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chatbot Circular Trigger Button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Web Bot"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-neutral-100 dark:bg-[#040404] dark:hover:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] hover:border-[#008763]/60 dark:hover:border-[#00c896]/60 shadow-xl shadow-black/10 dark:shadow-black/70 flex items-center justify-center transition-all group cursor-pointer"
          >
            <Bot className="w-6 h-6 text-neutral-700 dark:text-neutral-200 group-hover:text-[#008763] dark:group-hover:text-[#00c896] transition-colors" />
          </button>
        </div>

        {/* WhatsApp Circular Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-neutral-100 dark:bg-[#040404] dark:hover:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] hover:border-[#25D366]/60 shadow-xl shadow-black/10 dark:shadow-black/70 flex items-center justify-center transition-all group cursor-pointer"
        >
          <svg
            className="w-6 h-6 fill-neutral-700 dark:fill-neutral-200 group-hover:fill-[#25D366] transition-colors"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>

      {/* 2. Chat Modal with Blurred Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-[#040404]/75 backdrop-blur-md cursor-pointer"
            />

            {/* Chatbot Window Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-[430px] h-[580px] bg-white dark:bg-[#040404] border border-neutral-200 dark:border-[#1f1f1f] rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black flex flex-col justify-between overflow-hidden z-10 transition-colors duration-200"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-neutral-200 dark:border-[#1f1f1f] flex items-center justify-between bg-neutral-50 dark:bg-[#1f1f1f]/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#00c896]/30 flex items-center justify-center text-[#008763] dark:text-[#00c896] shadow-sm dark:shadow-none">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold tracking-wider text-neutral-900 dark:text-white font-mono">
                        SONAR <span className="text-[#008763] dark:text-[#00c896]">BOT</span>
                      </h3>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008763] dark:bg-[#00c896] animate-pulse" />
                    </div>
                    <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      SONARCHTECH Assistant
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-[#1f1f1f] transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-xs font-mono 
                [scrollbar-width:thin] 
                [scrollbar-color:#e2e8f0_transparent] dark:[scrollbar-color:#1f1f1f_transparent] 
                [&::-webkit-scrollbar]:w-1.5 
                [&::-webkit-scrollbar-track]:bg-transparent 
                [&::-webkit-scrollbar-thumb]:bg-neutral-200 dark:[&::-webkit-scrollbar-thumb]:bg-[#1f1f1f] 
                hover:[&::-webkit-scrollbar-thumb]:bg-[#008763]/70 dark:hover:[&::-webkit-scrollbar-thumb]:bg-[#00c896]/70 
                [&::-webkit-scrollbar-thumb]:rounded-full"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    {/* Primary Speech Bubble */}
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#008763] dark:bg-[#00c896] text-white dark:text-[#040404] font-semibold rounded-br-sm shadow-md shadow-[#008763]/10 dark:shadow-[#00c896]/10"
                          : "bg-neutral-50 dark:bg-[#1f1f1f]/50 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-[#1f1f1f] rounded-bl-sm"
                      }`}
                    >
                      {msg.message}

                      {/* Structured JSON: Key Points */}
                      {msg.keyPoints && msg.keyPoints.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-[#1f1f1f] space-y-1.5">
                          {msg.keyPoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-neutral-700 dark:text-neutral-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#008763] dark:text-[#00c896] shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Contact Shortcuts */}
                      {msg.role === "assistant" &&
                        (msg.message.toLowerCase().includes("whatsapp") ||
                          msg.message.toLowerCase().includes("email") ||
                          msg.message.toLowerCase().includes("team@sonarchtech.com")) && (
                          <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-[#1f1f1f] flex flex-wrap gap-2">
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#16a34a] dark:text-[#25D366] text-[11px] font-semibold hover:bg-[#25D366]/20 transition-colors"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp Us</span>
                            </a>
                            <button
                              onClick={scrollToContact}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#008763]/10 dark:bg-[#00c896]/10 border border-[#008763]/30 dark:border-[#00c896]/30 text-[#008763] dark:text-[#00c896] text-[11px] font-semibold hover:bg-[#008763]/20 dark:hover:bg-[#00c896]/20 transition-colors cursor-pointer"
                            >
                              <ArrowUpRight className="w-3 h-3" />
                              <span>Discovery Form</span>
                            </button>
                          </div>
                        )}
                    </div>

                    {/* Follow-Up Quick Reply Chips */}
                    {msg.role === "assistant" && msg.suggestedReplies && msg.suggestedReplies.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.suggestedReplies.map((chip, idx) => (
                          <button
                            key={idx}
                            disabled={isLoading}
                            onClick={() => sendMessage(chip)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-[#1f1f1f] hover:border-[#008763]/50 dark:hover:border-[#00c896]/50 bg-white dark:bg-[#1f1f1f]/40 hover:bg-[#008763]/10 dark:hover:bg-[#00c896]/10 text-[10px] text-neutral-700 dark:text-neutral-300 hover:text-[#008763] dark:hover:text-[#00c896] transition-all cursor-pointer font-mono shadow-sm dark:shadow-none"
                          >
                            <Sparkles className="w-2.5 h-2.5 text-[#008763] dark:text-[#00c896]" />
                            <span>{chip}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Animation */}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="bg-neutral-50 dark:bg-[#1f1f1f]/50 border border-neutral-200 dark:border-[#1f1f1f] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2.5">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008763] dark:bg-[#00c896] animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008763] dark:bg-[#00c896] animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008763] dark:bg-[#00c896] animate-bounce" />
                      </div>
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                        Sonar is thinking...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-neutral-200 dark:border-[#1f1f1f] bg-white dark:bg-[#040404]">
                <form
                  onSubmit={handleFormSubmit}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about your project idea..."
                      maxLength={300}
                      disabled={isLoading}
                      className="w-full bg-neutral-50 dark:bg-[#1f1f1f]/50 border border-neutral-200 dark:border-[#1f1f1f] rounded-full px-4 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#008763]/60 dark:focus:border-[#00c896]/60 transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-full bg-[#008763] hover:bg-[#006f52] dark:bg-[#00c896] dark:hover:bg-[#00b285] disabled:opacity-30 text-white dark:text-[#040404] font-bold flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-lg shadow-[#008763]/20 dark:shadow-[#00c896]/20"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[10px] font-mono text-center text-neutral-400 dark:text-neutral-500 mt-2.5">
                  SONARCHTECH Web Concierge
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}