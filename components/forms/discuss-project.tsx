"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface GTMEvent {
  event: string;
  page?: string;
  [key: string]: unknown;
}

type WindowWithDataLayer = Window & {
  dataLayer: GTMEvent[];
};

declare const window: WindowWithDataLayer;

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  message: z.string().min(1, "Message is required"),
  budget: z.enum(
    ["under-250", "250-1000", "1000-2000", "2000-5000", "5000-plus"],
    {
      message: "Please select a budget range",
    }
  ),
  howDidYouFindUs: z.string().optional(),
  preferredContact: z.enum(["email", "call"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function DiscussProjectForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const budget = watch("budget");
  const preferredContact = watch("preferredContact");

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          formType: "discuss-project",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      // Reset form
      setValue("name", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("companyName", "");
      setValue("message", "");
      setValue("budget", undefined as any);
      setValue("howDidYouFindUs", "");
      setValue("preferredContact", undefined as any);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "projectFormSubmission",
      });
    } catch (e: any) {
      const errorMessage = e.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          type="text"
          {...register("name", {
            onChange: () => trigger("name"),
          })}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            onChange: () => trigger("email"),
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          aria-invalid={errors.phone ? "true" : "false"}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          type="text"
          {...register("companyName", {
            onChange: () => trigger("companyName"),
          })}
          aria-invalid={errors.companyName ? "true" : "false"}
        />
        {errors.companyName && (
          <p className="text-sm text-destructive">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget *</Label>
        <Select
          value={budget}
          onValueChange={(value) => {
            setValue("budget", value as FormValues["budget"]);
            trigger("budget");
          }}
        >
          <SelectTrigger
            id="budget"
            className="w-full"
            aria-invalid={errors.budget ? "true" : "false"}
          >
            <SelectValue placeholder="Select a budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-250">Under £250</SelectItem>
            <SelectItem value="250-1000">£250 - £1,000</SelectItem>
            <SelectItem value="1000-2000">£1,000 - £2,000</SelectItem>
            <SelectItem value="2000-5000">£2,000 - £5,000</SelectItem>
            <SelectItem value="5000-plus">£5,000+</SelectItem>
          </SelectContent>
        </Select>
        {errors.budget && (
          <p className="text-sm text-destructive">{errors.budget.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="howDidYouFindUs">How did you find out about us?</Label>
        <Input
          id="howDidYouFindUs"
          type="text"
          {...register("howDidYouFindUs")}
          aria-invalid={errors.howDidYouFindUs ? "true" : "false"}
        />
        {errors.howDidYouFindUs && (
          <p className="text-sm text-destructive">
            {errors.howDidYouFindUs.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={6}
          {...register("message", {
            onChange: () => trigger("message"),
          })}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredContact">
          How would you prefer us to contact you?
        </Label>
        <Select
          value={preferredContact}
          onValueChange={(value) => {
            setValue("preferredContact", value as "email" | "call");
            trigger("preferredContact");
          }}
        >
          <SelectTrigger
            id="preferredContact"
            className="w-full"
            aria-invalid={errors.preferredContact ? "true" : "false"}
          >
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="call">Call back</SelectItem>
          </SelectContent>
        </Select>
        {errors.preferredContact && (
          <p className="text-sm text-destructive">
            {errors.preferredContact.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || loading}
        className="w-full"
        size="lg"
      >
        {isSubmitting || loading ? "Sending..." : "Send Message"}
      </Button>
      <Toaster position="top-right" />
    </form>
  );
}
