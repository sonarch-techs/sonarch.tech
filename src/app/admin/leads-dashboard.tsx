"use client";

import { useState } from "react";
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

export function LeadsDashboard({ initialLeads }: LeadsDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

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
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "contacted":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "qualified":
        return "bg-[#00c896]/15 text-[#00c896] border-[#00c896]/40";
      case "closed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "archived":
        return "bg-neutral-800 text-neutral-400 border-neutral-700";
      default:
        return "bg-neutral-800 text-neutral-400 border-neutral-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1f1f1f] bg-[#1f1f1f] text-[#00c896] text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00c896] animate-pulse" />
              <span>Live Inbound Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Executive CRM Terminal</h1>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1f1f1f] bg-[#1f1f1f]/50 hover:bg-[#1f1f1f] text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/30">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Total Inbound</span>
              <Inbox className="w-4 h-4 text-[#00c896]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight">{totalLeads}</div>
          </div>

          <div className="p-5 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/30">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Needs Review</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-cyan-400">{newLeads}</div>
          </div>

          <div className="p-5 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/30">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Qualified Deals</span>
              <CheckCircle2 className="w-4 h-4 text-[#00c896]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#00c896]">{qualifiedLeads}</div>
          </div>

          <div className="p-5 rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/30">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Enterprise Scale ($10k+)</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-purple-400">{highBudgetDeals}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Filter by name, company, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1f1f1f]/50 border border-[#1f1f1f] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00c896] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-neutral-500 shrink-0" />
            {["all", "new", "contacted", "qualified", "closed", "archived"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  statusFilter === st
                    ? "bg-[#00c896] text-[#040404] border-[#00c896]"
                    : "bg-[#1f1f1f]/40 text-neutral-400 border-[#1f1f1f] hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Data Table */}
        <div className="rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-300">
              <thead className="bg-[#1f1f1f]/60 text-xs uppercase tracking-wider text-neutral-400 border-b border-[#1f1f1f]">
                <tr>
                  <th className="px-6 py-4">Lead / Organization</th>
                  <th className="px-6 py-4">Selected Capabilities</th>
                  <th className="px-6 py-4">Budget Range</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Inspection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
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
                      className="hover:bg-[#1f1f1f]/40 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        <div>{lead.full_name}</div>
                        <div className="text-xs text-neutral-500 font-mono flex items-center gap-1.5 mt-0.5">
                          {lead.company_name ? (
                            <>
                              <Building className="w-3 h-3 text-neutral-400" />
                              <span>{lead.company_name}</span>
                            </>
                          ) : (
                            lead.email
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-xs text-neutral-400">
                        {lead.service_category}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-[#00c896]">
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
                      <td className="px-6 py-4 text-xs text-neutral-500 font-mono whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="p-1.5 rounded-lg hover:bg-[#1f1f1f] text-neutral-400 hover:text-white transition-colors"
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

      {/* Slide-Over Drawer for Detailed Lead Inspection */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-lg bg-[#040404] border-l border-[#1f1f1f] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1f1f1f] mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">
                    ID: {selectedLead.id.slice(0, 8)}...
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">{selectedLead.full_name}</h2>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl border border-[#1f1f1f] hover:bg-[#1f1f1f] text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-1">
                    Contact Channels
                  </span>
                  <div className="space-y-1.5">
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="flex items-center gap-2 text-[#00c896] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{selectedLead.email}</span>
                    </a>
                    {selectedLead.company_name && (
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Building className="w-4 h-4 text-neutral-500" />
                        <span>{selectedLead.company_name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-1">
                    Investment Scope
                  </span>
                  <div className="flex items-center gap-2 text-neutral-200">
                    <DollarSign className="w-4 h-4 text-[#00c896]" />
                    <span className="font-semibold">{selectedLead.budget_range}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-1">
                    Requested Modules
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.service_category.split(", ").map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs bg-[#1f1f1f] border border-[#1f1f1f] text-neutral-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-2">
                    Project Requirements Brief
                  </span>
                  <div className="p-4 rounded-xl bg-[#1f1f1f]/40 border border-[#1f1f1f] text-neutral-300 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                    {selectedLead.project_details}
                  </div>
                </div>

                <div>
                  <span className="block text-xs uppercase text-neutral-500 font-semibold mb-2">
                    Pipeline Stage
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {["new", "contacted", "qualified", "closed", "archived"].map((st) => (
                      <button
                        key={st}
                        disabled={updatingId === selectedLead.id}
                        onClick={() => handleStatusChange(selectedLead.id, st)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                          selectedLead.status === st
                            ? "bg-[#00c896] text-[#040404] border-[#00c896] font-bold"
                            : "bg-[#1f1f1f]/50 text-neutral-400 border-[#1f1f1f] hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1f1f1f] mt-8 flex justify-between items-center text-xs text-neutral-500">
              <span>Logged: {new Date(selectedLead.created_at).toLocaleString()}</span>
              <a
                href={`mailto:${selectedLead.email}?subject=RE: SONARCHTECH Project Discovery`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00c896] hover:bg-[#00b285] text-[#040404] font-bold transition-colors"
              >
                <span>Reply via Mail</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}