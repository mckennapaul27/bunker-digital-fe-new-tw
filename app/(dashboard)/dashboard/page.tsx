import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth-helpers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Welcome back,{" "}
            {session.user?.firstName || session.user?.email || "User"}!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/dashboard/settings">
              <Button variant="outline" className="w-full md:w-auto" size="sm">
                Manage your account
              </Button>
            </Link>
            <Link href="/dashboard/subscriptions">
              <Button variant="outline" className="w-full md:w-auto" size="sm">
                View your subscriptions
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
