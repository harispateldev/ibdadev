"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const projectTypes = [
  "AI Integration",
  "SaaS / Mobile App",
  "Web System",
  "Automation / Dashboard",
  "Other",
];

const budgetRanges = ["< $5k", "$5k - $15k", "$15k - $30k", "$30k+"];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "AI Integration",
    budget: "$5k - $15k",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          projectType: "AI Integration",
          budget: "$5k - $15k",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <main className="min-h-screen bg-ibda-bg px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(215,180,106,0.12),transparent_24rem),radial-gradient(circle_at_85%_35%,rgba(96,230,210,0.10),transparent_24rem)]" />

      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="mb-4 inline-block text-xs font-black uppercase tracking-[0.26em] text-ibda-gold">
            Start the conversation
          </span>
          <h1 className="text-4xl font-black leading-[0.94] tracking-tight md:text-6xl lg:text-7xl">
            Bring a real problem. <br />
            <span className="bg-gradient-to-r from-[#D7B46A] via-[#60E6D2] to-[#8E7CFF] bg-clip-text text-transparent">
              We&apos;ll build the system.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
            Tell us about your goals, timelines, and constraints. We respond within 24 hours with a clear build path.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 rounded-2xl border border-white/[0.08] bg-[#0A0908]/90 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur md:p-12"
        >
          {status === "success" ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#60E6D2]/16 text-[#60E6D2] shadow-[0_0_50px_rgba(96,230,210,0.2)]">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white">Project Inquiry Received!</h2>
              <p className="mt-3 text-base text-white/60">
                Thank you for reaching out. A senior lead will review your requirements and reach back out within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 rounded-full bg-white/10 px-8 py-3.5 text-sm font-black text-white transition-colors hover:bg-white/20"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Anti-Spam Honeypot (Hidden) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  autoComplete="off"
                />
              </div>

              {/* Name & Email Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2.5 block text-xs font-black uppercase tracking-[0.2em] text-white/40">
                    Your Name <span className="text-ibda-gold">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white placeholder-white/20 transition-all focus:border-[#D7B46A] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#D7B46A]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2.5 block text-xs font-black uppercase tracking-[0.2em] text-white/40">
                    Email Address <span className="text-ibda-gold">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white placeholder-white/20 transition-all focus:border-[#D7B46A] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#D7B46A]"
                  />
                </div>
              </div>

              {/* Project Type Selection */}
              <div>
                <label className="mb-3 block text-xs font-black uppercase tracking-[0.2em] text-white/40">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`rounded-lg border px-4 py-2.5 text-xs font-bold transition-all ${
                        formData.projectType === type
                          ? "border-[#D7B46A] bg-[rgba(215,180,106,0.15)] text-[#D7B46A] shadow-[0_0_20px_rgba(215,180,106,0.2)]"
                          : "border-white/[0.08] bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range Selection */}
              <div>
                <label className="mb-3 block text-xs font-black uppercase tracking-[0.2em] text-white/40">
                  Target Budget (USD)
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {budgetRanges.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`rounded-lg border px-4 py-2.5 text-center text-xs font-bold transition-all ${
                        formData.budget === b
                          ? "border-[#60E6D2] bg-[rgba(96,230,210,0.15)] text-[#60E6D2] shadow-[0_0_20px_rgba(96,230,210,0.2)]"
                          : "border-white/[0.08] bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="message" className="mb-2.5 block text-xs font-black uppercase tracking-[0.2em] text-white/40">
                  Project Brief & Constraints <span className="text-ibda-gold">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Tell us what needs to improve, key goals, deadlines, or existing tools..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white placeholder-white/20 transition-all focus:border-[#D7B46A] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#D7B46A]"
                />
              </div>

              {/* Error Message display */}
              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-xl bg-[#D7B46A] py-5 text-center text-base font-black text-black shadow-[0_18px_50px_rgba(215,180,106,0.24)] transition-all hover:bg-[#E2C37D] hover:shadow-[0_22px_60px_rgba(215,180,106,0.3)] active:scale-[0.99] disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting Inquiry..." : "Submit Project Inquiry →"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
