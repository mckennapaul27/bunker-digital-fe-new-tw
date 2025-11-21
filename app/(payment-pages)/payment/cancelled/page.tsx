"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle } from "lucide-react";
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

function PaymentCancelled() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

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
                <XCircle className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
              <CardDescription>Your payment was cancelled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                You have successfully registered a payment account with Bunker
                Digital, but your payment was cancelled. Please proceed to your
                dashboard to set up your payment.
              </p>
              <div className="flex justify-center pt-4">
                <Button asChild className="w-full sm:w-auto">
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

export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCancelled />
    </Suspense>
  );
}
