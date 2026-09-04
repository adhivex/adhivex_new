"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { submitContactForm } from "@/app/contact/actions";

const SERVICE_OPTIONS = [
  { value: "web", label: "Website design & development" },
  { value: "automation", label: "AI automation" },
  { value: "data", label: "Data engineering & analytics" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under $10k" },
  { value: "10k-25k", label: "$10k – $25k" },
  { value: "25k-plus", label: "$25k+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ status: "idle" | "success" | "error"; message?: string }>({
    status: "idle",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: undefined,
      budget: undefined,
      message: "",
      website: "",
    },
  });

  const service = watch("service");
  const budget = watch("budget");

  function onSubmit(values: ContactFormValues) {
    setResult({ status: "idle" });
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.set(key, value ?? "");
    });

    startTransition(async () => {
      const response = await submitContactForm({ status: "idle" }, formData);
      if (response.status === "success") {
        setResult({ status: "success" });
        reset();
      } else if (response.status === "error") {
        setResult({ status: "error", message: response.message });
      }
    });
  }

  if (result.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel flex flex-col items-center gap-3 rounded-2xl p-12 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <h3 className="font-display text-xl">Message sent</h3>
        <p className="max-w-sm text-sm text-foreground-muted">
          Thanks for reaching out — we typically reply within one business day.
        </p>
        <Button variant="outline" className="mt-2 border-white/15" onClick={() => setResult({ status: "idle" })}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel space-y-6 rounded-2xl p-8">
      {/* Honeypot — hidden from real users, catches simple bots. */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Jane Doe" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@company.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (optional)</Label>
        <Input id="company" placeholder="Company Inc." {...register("company")} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Service</Label>
          <Select value={service} onValueChange={(v) => setValue("service", v as ContactFormValues["service"], { shouldValidate: true })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Budget</Label>
          <Select value={budget} onValueChange={(v) => setValue("budget", v as ContactFormValues["budget"], { shouldValidate: true })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget && <p className="text-xs text-destructive">{errors.budget.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Project details</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="What are you trying to build?"
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      <AnimatePresence>
        {result.status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {result.message}
          </motion.div>
        )}
      </AnimatePresence>

      <Button type="submit" disabled={isPending} className="w-full bg-accent text-white hover:bg-accent/90 sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
