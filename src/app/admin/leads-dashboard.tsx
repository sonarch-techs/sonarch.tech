"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Inbox,
  CheckCircle2,
  Clock,
  Search,
  LogOut,
  Mail,
  Building,
  DollarSign,
  ChevronRight,
  X,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { updateLeadStatusAction, logoutAdminAction } from "@/app/actions/admin-leads";

export interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  company_name: string | null;
  service_category: string;
  budget_range: string;
  project_details: string;
  status: string;
}

interface LeadsDashboardProps {
  initialLeads: Lead[];
}

// Deterministic date formatters to prevent SSR/client timezone and locale mismatches
function formatDate(dateString: string): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateTime(dateString: string): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hours = String(d.getUTCHours()).padStart(2, "0");
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
}

export function LeadsDashboard({ initialLeads }: LeadsDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  // Close drawer on Escape key & Lock background scroll
  useEffect(() => {
    if (!selectedLead) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedLead(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedLead]);

  // Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const highBudgetDeals = leads.filter(
    (l) => l.budget_range === "$10,000 - $25,000" || l.budget_range === "$25,000+"
  ).length;

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company_name && lead.company_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.service_category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" ? true : lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    const res = await updateLeadStatusAction(leadId, newStatus);
    setUpdatingId(null);

    if (res.success) {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead?.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    }
  };

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-sky-500/10 text-sky-700 border-sky-500/30 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30";
      case "contacted":
        return "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/30";
      case "qualified":
        return "bg-[#008763]/10 text-[#008763] border-[#008763]/30 dark:bg-[#00c896]/15 dark:text-[#00c896] dark:border-[#00c896]/40";
      case "closed":
        return "bg-emerald-600/10 text-emerald-700 border-emerald-600/30 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40";
      case "archived":
      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#040404] text-neutral-900 dark:text-white p-4 sm:p-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-[#1f1f1f] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-[#1f1f1f] bg-white dark:bg-[#1f1f1f] text-[#008763] dark:text-[#00c896] text-xs font-semibold mb-2 font-mono shadow-sm dark:shadow-none">
              <span className="w-2 h-2 rounded-full bg-[#008763] dark:bg-[#00c896] animate-pulse" />
              <span>Live Inbound Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-neutral-900 dark:text-white">
              Executive CRM Terminal
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-white hover:bg-neutral-100 dark:bg-[#1f1f1f]/50 dark:hover:bg-[#1f1f1f] text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white text-xs font-medium font-mono transition-colors shadow-sm dark:shadow-none cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/30 backdrop-blur-sm shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 mb-2 font-mono">
              <span className="text-xs uppercase tracking-wider font-semibold">Total Inbound</span>
              <Inbox className="w-4 h-4 text-[#008763] dark:text-[#00c896]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono">
              {totalLeads}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/30 backdrop-blur-sm shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 mb-2 font-mono">
              <span className="text-xs uppercase tracking-wider font-semibold">Needs Review</span>
              <Clock className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-sky-600 dark:text-cyan-400 font-mono">
              {newLeads}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/30 backdrop-blur-sm shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 mb-2 font-mono">
              <span className="text-xs uppercase tracking-wider font-semibold">Qualified Deals</span>
              <CheckCircle2 className="w-4 h-4 text-[#008763] dark:text-[#00c896]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#008763] dark:text-[#00c896] font-mono">
              {qualifiedLeads}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/30 backdrop-blur-sm shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400 mb-2 font-mono">
              <span className="text-xs uppercase tracking-wider font-semibold">Enterprise Scale ($10k+)</span>
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-purple-600 dark:text-purple-400 font-mono">
              {highBudgetDeals}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
            <input
              type="text"
              placeholder="Filter by name, company, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1f1f1f]/50 border border-neutral-200 dark:border-[#1f1f1f] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#008763] dark:focus:border-[#00c896] transition-colors font-mono shadow-sm dark:shadow-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
            {["all", "new", "contacted", "qualified", "closed", "archived"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border font-mono transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#008763] text-white border-[#008763] dark:bg-[#00c896] dark:text-[#040404] dark:border-[#00c896]"
                    : "bg-white dark:bg-[#1f1f1f]/40 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-[#1f1f1f] hover:text-neutral-900 dark:hover:text-white shadow-sm dark:shadow-none"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Data Table */}
        <div className="rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#1f1f1f]/20 overflow-hidden shadow-sm dark:shadow-none backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-700 dark:text-neutral-300 font-mono">
              <thead className="bg-neutral-50 dark:bg-[#1f1f1f]/60 text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-[#1f1f1f]">
                <tr>
                  <th className="px-6 py-4">Lead / Organization</th>
                  <th className="px-6 py-4">Selected Capabilities</th>
                  <th className="px-6 py-4">Budget Range</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Inspection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-[#1f1f1f]">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 text-sm">
                      No matching records discovered in pipeline.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-neutral-50 dark:hover:bg-[#1f1f1f]/40 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                        <div>{lead.full_name}</div>
                        <div className="text-xs text-neutral-500 font-mono flex items-center gap-1.5 mt-0.5">
                          {lead.company_name ? (
                            <>
                              <Building className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
                              <span>{lead.company_name}</span>
                            </>
                          ) : (
                            lead.email
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-xs text-neutral-600 dark:text-neutral-400">
                        {lead.service_category}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-[#008763] dark:text-[#00c896] font-semibold">
                        {lead.budget_range}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${getStatusColor(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td
                        suppressHydrationWarning
                        className="px-6 py-4 text-xs text-neutral-500 font-mono whitespace-nowrap"
                      >
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#1f1f1f] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Slide-Over Drawer with Sticky Header & Footer */}
      {selectedLead && (
        <div
          onClick={() => setSelectedLead(null)}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[100] flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white dark:bg-[#040404] border-l border-neutral-200 dark:border-[#1f1f1f] flex flex-col h-full shadow-2xl shadow-neutral-900/30 dark:shadow-black relative z-[101]"
          >
            {/* 1. Sticky Pinned Navigation Bar (Always visible at the top) */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#040404]/95 backdrop-blur-md border-b border-neutral-200 dark:border-[#1f1f1f]">
              <button
                onClick={() => setSelectedLead(null)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] bg-neutral-100 hover:bg-neutral-200 dark:bg-[#1f1f1f]/60 dark:hover:bg-[#1f1f1f] text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-all cursor-pointer font-semibold shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Dashboard</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
                  [ESC] to close
                </span>
                <button
                  onClick={() => setSelectedLead(null)}
                  aria-label="Close lead details"
                  className="p-1.5 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] hover:bg-neutral-100 dark:hover:bg-[#1f1f1f] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">
                  ID: {selectedLead.id.slice(0, 8)}...
                </span>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1 font-mono">
                  {selectedLead.full_name}
                </h2>
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-1 font-mono">
                    Contact Channels
                  </span>
                  <div className="space-y-1.5">
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="flex items-center gap-2 text-[#008763] dark:text-[#00c896] hover:underline font-mono"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{selectedLead.email}</span>
                    </a>
                    {selectedLead.company_name && (
                      <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-mono">
                        <Building className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                        <span>{selectedLead.company_name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-1 font-mono">
                    Investment Scope
                  </span>
                  <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-200 font-mono">
                    <DollarSign className="w-4 h-4 text-[#008763] dark:text-[#00c896]" />
                    <span className="font-semibold">{selectedLead.budget_range}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-1 font-mono">
                    Requested Modules
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.service_category.split(", ").map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#1f1f1f] text-neutral-700 dark:text-neutral-300 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-2 font-mono">
                    Project Requirements Brief
                  </span>
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#1f1f1f]/40 border border-neutral-200 dark:border-[#1f1f1f] text-neutral-800 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm font-mono">
                    {selectedLead.project_details}
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-2 font-mono">
                    Pipeline Stage
                  </span>
                  <div className="grid grid-cols-3 gap-2 font-mono">
                    {["new", "contacted", "qualified", "closed", "archived"].map((st) => (
                      <button
                        key={st}
                        disabled={updatingId === selectedLead.id}
                        onClick={() => handleStatusChange(selectedLead.id, st)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                          selectedLead.status === st
                            ? "bg-[#008763] text-white border-[#008763] font-bold dark:bg-[#00c896] dark:text-[#040404] dark:border-[#00c896]"
                            : "bg-neutral-100 dark:bg-[#1f1f1f]/50 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-[#1f1f1f] hover:text-neutral-900 dark:hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Sticky Bottom Action Bar (Always visible at the bottom) */}
            <div className="sticky bottom-0 z-30 px-6 py-4 bg-white/95 dark:bg-[#040404]/95 backdrop-blur-md border-t border-neutral-200 dark:border-[#1f1f1f] flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-[#1f1f1f] hover:bg-neutral-100 dark:hover:bg-[#1f1f1f] text-neutral-600 dark:text-neutral-400 font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
              
              <div className="flex items-center gap-3">
                <span suppressHydrationWarning className="text-neutral-500 hidden sm:inline">
                  {formatDateTime(selectedLead.created_at)}
                </span>
                <a
                  href={`mailto:${selectedLead.email}?subject=RE: SONARCHTECH Project Discovery`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#008763] hover:bg-[#006f52] dark:bg-[#00c896] dark:hover:bg-[#00b285] text-white dark:text-[#040404] font-bold transition-all shadow-sm"
                >
                  <span>Reply via Mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}