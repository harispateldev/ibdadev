"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ibda-bg px-6 text-center text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(240,106,61,0.14),transparent_24rem)]" />
      <span className="text-xs font-black uppercase tracking-[0.28em] text-[#F06A3D]">
        System Exception
      </span>
      <h1 className="mt-4 text-5xl font-black leading-none md:text-7xl">
        Something went wrong.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
        An unexpected application boundary exception occurred. Our monitoring systems have logged this event.
      </p>
      <div className="mt-10 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-full bg-[#F06A3D] px-8 py-3.5 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
        >
          Try Again
        </button>
        <a
          href="/"
          className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}
