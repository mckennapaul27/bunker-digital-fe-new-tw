"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButtonClient() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      className="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium text-charcoal hover:bg-gray-100 transition-colors w-full sm:w-auto cursor-pointer"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}
