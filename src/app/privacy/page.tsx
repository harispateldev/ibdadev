import React from "react";

export const metadata = {
  title: "Privacy Policy",
  description: "IbdaDev Privacy Policy — details on data handling, cookies, and client confidentiality.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ibda-bg px-6 pb-24 pt-32 text-white">
      <div className="container mx-auto max-w-4xl">
        <span className="mb-4 inline-block text-xs font-black uppercase tracking-[0.26em] text-[#D7B46A]">
          Legal & Compliance
        </span>
        <h1 className="text-4xl font-black md:text-6xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-white/40">Last updated: June 28, 2026</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="mb-3 text-lg font-black text-white">1. Information We Collect</h2>
            <p>
              When you submit a project inquiry via our contact form, we collect personal information including your name, email address, company details, target budget, and project requirements. We also use essential telemetry cookies to measure website traffic and performance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-black text-white">2. How We Use Information</h2>
            <p>
              Information collected is used strictly for scoping client projects, executing custom software builds, responding to inquiries, and improving website responsiveness. We never sell or rent your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-black text-white">3. Client Confidentiality</h2>
            <p>
              All proprietary business logic, product specs, and code repositories shared with IbdaDev during consultations or active builds are protected under strict NDA and confidential studio practices.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-black text-white">4. Contact Us</h2>
            <p>
              For privacy-related questions or data deletion requests, contact us at{" "}
              <a href="mailto:hello@ibdadev.com" className="text-[#D7B46A] underline">
                hello@ibdadev.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
