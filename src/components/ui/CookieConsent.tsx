"use client";

import React, { useState, useEffect } from "react";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ibda_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("ibda_cookie_consent", "accepted");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("ibda_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-white/10 bg-[#0D0C0A]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D7B46A]">
            Privacy & Cookies
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/70">
            We use essential cookie tools to measure traffic and deliver high-performance interactive 3D experiences. Read our{" "}
            <a href="/privacy" className="text-[#60E6D2] underline hover:text-white">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button
          onClick={acceptCookies}
          className="flex-1 rounded-lg bg-[#D7B46A] py-2.5 text-xs font-black text-black transition-transform hover:-translate-y-0.5"
        >
          Accept All
        </button>
        <button
          onClick={declineCookies}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white"
        >
          Decline
        </button>
      </div>
    </div>
  );
};
