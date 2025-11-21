import { getServerSession } from "next-auth";
import { NextAuthProvider } from "@/app/providors";
import { authOptions } from "@/app/utils/auth-helpers";
import { redirect } from "next/navigation";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <NextAuthProvider>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      {children}
    </NextAuthProvider>
  );
}
