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
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ResetPassword({ token }: { token: string }) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(
        `${serverUrl}/api/api-users/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: data.password }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to reset password");
      }

      setSuccess(true);
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (e: any) {
      toast.error(
        e.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  if (success) {
    return (
      <div className="space-y-4 max-w-lg text-center">
        <p className="text-muted-foreground">
          Your password has been updated. Redirecting to login...
        </p>
        <Link
          href="/auth/login"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline inline-block"
        >
          Go to login
        </Link>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Resetting..." : "Reset password"}
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
