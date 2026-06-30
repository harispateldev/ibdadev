import React from "react";

export const metadata = {
  title: "Terms of Service",
  description: "IbdaDev Terms of Service — service scope, IP ownership, and project execution guidelines.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ibda-bg px-6 pb-24 pt-32 text-white">
      <div className="container mx-auto max-w-4xl">
        <span className="mb-4 inline-block text-xs font-black uppercase tracking-[0.26em] text-[#60E6D2]">
          Legal & Governance
        </span>
        <h1 className="text-4xl font-black md:text-6xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-white/40">Last updated: June 28, 2026</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="mb-3 text-lg font-black text-white">1. Scope of Services</h2>
            <p>
              IbdaDev provides custom software development, AI integrations, web applications, dashboards, and automated system engineering services under agreed statement of work (SOW) contracts.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-black text-white">2. Intellectual Property Rights</h2>
            <p>
              Upon final payment fulfillment, full custom codebase rights, architectural assets, and deployed production artifacts belong exclusively to the client, subject to standard open-source dependency licenses.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-black text-white">3. Warranty & Handoff</h2>
            <p>
              Every build includes structured documentation and a post-launch support window to guarantee system stability and seamless team handoff.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
