"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButtonClient from "@/app/(dashboard)/dashboard/settings/logout-button-client";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscriptions",
  },
];

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const MenuContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="flex flex-col space-y-2">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "px-4 py-3 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-[var(--color-primary)] text-[var(--color-charcoal)]"
                : "text-charcoal hover:bg-gray-100 hover:text-charcoal"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex xl:flex-col xl:w-64 xl:fixed xl:inset-y-0 xl:bg-white xl:border-r xl:border-gray-200">
        <div className="flex flex-col flex-1 pt-20 pb-4 overflow-y-auto">
          <div className="flex-1 px-4 space-y-2">
            <MenuContent />
          </div>
          <div className="px-4 pt-4 border-t border-gray-200">
            <LogoutButtonClient />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 xl:ml-64">
        {/* Mobile Header */}
        <header className="xl:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 h-16">
            <h1 className="text-lg font-bold text-charcoal">Dashboard</h1>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold text-charcoal">Menu</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <div className="flex-1 p-4">
                    <MenuContent onItemClick={() => setMobileMenuOpen(false)} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 xl:p-8 xl:pt-20">{children}</main>
      </div>
    </div>
  );
}
