import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ibda-bg px-6 text-center text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(215,180,106,0.14),transparent_24rem)]" />
      <span className="text-xs font-black uppercase tracking-[0.28em] text-[#D7B46A]">
        404 — Page Not Found
      </span>
      <h1 className="mt-4 text-6xl font-black leading-none md:text-8xl">
        Lost in the void.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
        The page or system resource you are looking for does not exist or has been moved.
      </p>
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="rounded-full bg-[#D7B46A] px-8 py-3.5 text-sm font-black text-black transition-transform hover:-translate-y-0.5"
        >
          Return Home
        </Link>
        <Link
          href="/work"
          className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
        >
          View Work
        </Link>
      </div>
    </main>
  );
}
