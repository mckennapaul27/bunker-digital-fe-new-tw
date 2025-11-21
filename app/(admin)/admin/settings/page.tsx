import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth-helpers";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LogoutButtonClient from "@/app/(dashboard)/dashboard/settings/logout-button-client";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const user = session.user;

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="">Settings</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-base font-medium text-charcoal mb-4">
              Account Information
            </p>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-charcoal">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm text-charcoal font-mono">
                  {user.id}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  First Name
                </dt>
                <dd className="mt-1 text-sm text-charcoal">
                  {user.firstName || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                <dd className="mt-1 text-sm text-charcoal">
                  {user.lastName || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-charcoal capitalize">
                  {user.role || "N/A"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-base font-medium text-charcoal mb-4">Actions</p>
            <LogoutButtonClient />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
