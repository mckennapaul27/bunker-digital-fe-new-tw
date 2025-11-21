import { NextAuthProvider } from "@/app/providors";
import { authOptions } from "@/app/utils/auth-helpers";
import DashboardAdminWrapper from "@/components/dashboard/dashboard-admin-wrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  if (session?.user?.role !== "admin") {
    redirect("/dashboard");
  }
  return (
    <NextAuthProvider>
      <DashboardAdminWrapper>{children}</DashboardAdminWrapper>
    </NextAuthProvider>
  );
}
