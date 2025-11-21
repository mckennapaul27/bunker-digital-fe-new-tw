"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { CircleLoader } from "react-spinners";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    setStatus("success");
  }, [sessionId]);

  if (status === "loading") {
    return (
      <>
        <div className="hidden xl:block">
          <NavbarDesktop />
        </div>
        <div className="xl:hidden">
          <NavbarTouchWrapper />
        </div>
        <section className="bg-white py-20 xl:py-28 min-h-[60vh] flex items-center justify-center">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <CircleLoader color="#000" size={30} />
                  <p className="text-sm text-gray-500">Processing payment...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div className="hidden xl:block">
          <NavbarDesktop />
        </div>
        <div className="xl:hidden">
          <NavbarTouchWrapper />
        </div>
        <section className="bg-white py-20 xl:py-28 min-h-[60vh] flex items-center justify-center">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Payment Error</CardTitle>
                <CardDescription>
                  There was an issue processing your payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Please try again or contact support if the problem persists.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="w-full sm:w-auto"
                  >
                    Go Back
                  </Button>
                  <Button asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/subscriptions">
                      View Subscriptions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      <section className="bg-white py-20 xl:py-28 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>
                Your subscription has been set up successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Thank you for your payment. Your subscription is now active and
                you can manage it from your dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/dashboard/subscriptions">
                    View Subscriptions
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <CircleLoader color="#000" size={30} />
        </div>
      }
    >
      <PaymentStatus />
    </Suspense>
  );
}
