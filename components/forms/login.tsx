"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email.trim(),
        password: data.password,
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }

      if (!signInResult?.ok) {
        throw new Error("Sign in failed. Please check your credentials.");
      }

      toast.success("Login successful! Redirecting...");
      router.push("/dashboard");
    } catch (e: any) {
      const errorMessage =
        e.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
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

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
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

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <div className="text-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Forgot password?
        </Link>
      </div>
      <Toaster position="top-right" />
    </form>
  );
}
