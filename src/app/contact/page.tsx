"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const projectTypes = [
  { label: "Software product", detail: "SaaS, platform, portal" },
  { label: "Mobile app", detail: "Customer or team app" },
  { label: "AI system", detail: "Assistants, routing, workflows" },
  { label: "Automation stack", detail: "CRM, ops, dashboards" },
  { label: "Website + growth", detail: "Premium site with conversion flow" },
];

const stages = ["Idea to scope", "Redesign existing", "Build MVP", "Scale live system"];

const engagementLanes = [
  "Discovery sprint",
  "MVP build",
  "Launch upgrade",
  "Long-term product partner",
];

const nextSteps = [
  ["1", "Review", "We read the brief and identify the real business flow."],
  ["2", "Reply", "You get a senior response with questions or a first path."],
  ["3", "Scope", "If it fits, we map timeline, stack, and first release."],
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    projectType: "Software product",
    stage: "Idea to scope",
    budget: "MVP build",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const inputClass = "w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-4 text-sm font-semibold text-white placeholder-white/22 transition-all focus:border-[#D7B46A] focus:bg-white/[0.055] focus:outline-none focus:ring-1 focus:ring-[#D7B46A]";
  const labelClass = "mb-2.5 block text-[10px] font-black uppercase tracking-[0.2em] text-white/42";

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
          company: "",
          website: "",
          projectType: "Software product",
          stage: "Idea to scope",
          budget: "MVP build",
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

      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr] lg:items-end"
        >
          <div>
            <span className="mb-4 inline-block text-xs font-black uppercase tracking-[0.26em] text-ibda-gold">
              Start with the business problem
            </span>
            <h1 className="max-w-4xl font-display text-4xl font-black leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
              Tell us what needs to work.{" "}
              <span className="bg-gradient-to-r from-[#D7B46A] via-[#60E6D2] to-[#8E7CFF] bg-clip-text text-transparent">
                We will map the build.
              </span>
            </h1>
          </div>
          <p className="max-w-md text-base font-semibold leading-relaxed text-white/52 lg:justify-self-end">
            This is not a quick quote form. It is a senior intake for software, AI, automation, mobile apps, dashboards, and business systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 grid overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[#0A0908]/92 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur lg:grid-cols-[0.36fr_0.64fr]"
        >
          <aside className="relative border-b border-white/[0.08] bg-[#050505] p-7 md:p-9 lg:border-b-0 lg:border-r">
            <div className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-[#D7B46A]/10 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-52 w-52 rounded-full bg-[#60E6D2]/10 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/32">
                Agency intake
              </p>
              <h2 className="mt-5 font-display text-3xl font-black leading-none text-white md:text-4xl">
                A better brief gets a better system.
              </h2>
              <p className="mt-5 text-sm font-semibold leading-relaxed text-white/50">
                Share the business context, not just a feature list. We look for the customer journey, team workflow, data, and launch reality.
              </p>

              <div className="mt-8 grid gap-3">
                {nextSteps.map(([number, title, line]) => (
                  <div key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D7B46A] text-xs font-black text-black">
                        {number}
                      </span>
                      <p className="text-sm font-black text-white">{title}</p>
                    </div>
                    <p className="mt-3 text-xs font-semibold leading-relaxed text-white/42">
                      {line}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#D7B46A]/18 bg-[#D7B46A]/8 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#D7B46A]">
                  Best fit
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-white/56">
                  Businesses that need a real product partner for software, AI, automation, mobile, web, or connected operations.
                </p>
              </div>
            </div>
          </aside>

          <div id="project-intake" className="scroll-mt-28 p-6 md:p-9 lg:p-10">
            {status === "success" ? (
              <div className="grid min-h-[34rem] place-items-center py-12 text-center">
                <div>
                  <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#60E6D2]/16 text-[#60E6D2] shadow-[0_0_50px_rgba(96,230,210,0.2)]">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-display text-4xl font-black text-white">Brief received.</h2>
                  <p className="mx-auto mt-3 max-w-md text-base font-semibold leading-relaxed text-white/58">
                    A senior lead will review the business context and reply with the right next step within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 rounded-full bg-white/10 px-8 py-3.5 text-sm font-black text-white transition-colors hover:bg-white/20"
                  >
                    Send another brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
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

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Your name / role <span className="text-ibda-gold">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Founder, operator, product lead..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Work email <span className="text-ibda-gold">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClass}>
                      Company / brand <span className="text-ibda-gold">*</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      placeholder="Your business name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className={labelClass}>
                      Website or product link
                    </label>
                    <input
                      id="website"
                      type="text"
                      placeholder="Optional, if something exists"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>What are we building?</label>
                  <div className="grid gap-2.5 md:grid-cols-5">
                    {projectTypes.map((type) => (
                      <button
                        key={type.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: type.label })}
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          formData.projectType === type.label
                            ? "border-[#D7B46A] bg-[rgba(215,180,106,0.14)] shadow-[0_0_24px_rgba(215,180,106,0.16)]"
                            : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className={`block text-xs font-black ${formData.projectType === type.label ? "text-[#D7B46A]" : "text-white/68"}`}>
                          {type.label}
                        </span>
                        <span className="mt-2 block text-[11px] font-semibold leading-snug text-white/34">
                          {type.detail}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Current stage</label>
                    <div className="grid gap-2">
                      {stages.map((stage) => (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => setFormData({ ...formData, stage })}
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-black transition-all ${
                            formData.stage === stage
                              ? "border-[#60E6D2] bg-[rgba(96,230,210,0.12)] text-[#60E6D2]"
                              : "border-white/[0.08] bg-white/[0.03] text-white/48 hover:text-white/80"
                          }`}
                        >
                          {stage}
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Engagement lane</label>
                    <div className="grid gap-2">
                      {engagementLanes.map((lane) => (
                        <button
                          key={lane}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: lane })}
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-black transition-all ${
                            formData.budget === lane
                              ? "border-[#D7B46A] bg-[rgba(215,180,106,0.13)] text-[#D7B46A]"
                              : "border-white/[0.08] bg-white/[0.03] text-white/48 hover:text-white/80"
                          }`}
                        >
                          {lane}
                          <span className="text-[10px] uppercase tracking-[0.14em] opacity-60">Select</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Business brief <span className="text-ibda-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="What needs to improve? Who uses it? What tools are involved? What would a successful first release change for the business?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={inputClass}
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                    {errorMessage}
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                  <p className="text-xs font-semibold leading-relaxed text-white/38">
                    No generic packages or instant quotes. We reply when the project context is clear enough to be useful.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="rounded-2xl bg-[#D7B46A] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-black shadow-[0_18px_50px_rgba(215,180,106,0.24)] transition-all hover:bg-[#E2C37D] hover:shadow-[0_22px_60px_rgba(215,180,106,0.3)] active:scale-[0.99] disabled:opacity-50"
                  >
                    {status === "submitting" ? "Sending brief..." : "Request build review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
