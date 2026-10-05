import { redirect } from "next/navigation";
import { verifyAdminSession, getLeadsAction } from "@/app/actions/admin-leads";
import { LeadsDashboard } from "./leads-dashboard";

export const metadata = {
  title: "CRM Terminal | SONARCHTECH Admin",
  robots: "noindex, nofollow",
};

export default async function AdminPage() {
  const isAuth = await verifyAdminSession();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const { leads } = await getLeadsAction();

  return <LeadsDashboard initialLeads={leads || []} />;
}