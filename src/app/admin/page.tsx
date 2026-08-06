import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/admin-auth";
import { listProperties } from "@/lib/properties-store";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const properties = await listProperties();

  return <AdminDashboard email={session.email} properties={properties} />;
}
