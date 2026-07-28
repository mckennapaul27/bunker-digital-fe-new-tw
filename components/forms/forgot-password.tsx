"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverUrl } from "@/config";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(`${serverUrl}/api/api-users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email.trim() }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to send reset email");
      }

      setSubmitted(true);
      toast.success(
        result.message ||
          "If an account exists, you will receive a password reset email"
      );
    } catch (e: any) {
      toast.error(
        e.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  if (submitted) {
    return (
      <div className="space-y-4 max-w-lg text-center">
        <p className="text-muted-foreground">
          If an account exists for that email, you will receive a password reset
          link shortly. Check your inbox and spam folder.
        </p>
        <Link
          href="/auth/login"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline inline-block"
        >
          Back to login
        </Link>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <p className="text-sm text-muted-foreground">
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </p>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending..." : "Send reset link"}
      </Button>

      <div className="text-center">
        <Link
          href="/auth/login"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Back to login
        </Link>
      </div>
      <Toaster position="top-right" />
    </form>
  );
}
