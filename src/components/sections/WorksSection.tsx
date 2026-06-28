"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type CaseStudy = {
  index: string;
  title: string;
  category: string;
  statement: string;
  problem: string;
  shipped: string;
  outcome: string;
  metric: string;
  accent: string;
  stack: string[];
  preview: {
    label: string;
    value: string;
    rows: string[];
  };
};

const cases: CaseStudy[] = [
  {
    index: "01",
    title: "AI lead desk",
    category: "AI workflow",
    statement: "A business inbox that qualifies and routes leads before the team opens WhatsApp.",
    problem: "Enquiries were split across forms, chat, and manual follow-up.",
    shipped: "AI intake, lead scoring, CRM sync, reply drafts, and owner routing.",
    outcome: "Every lead gets a fast first response and a clear next step.",
    metric: "Reply time: minutes",
    accent: "#D7B46A",
    stack: ["AI", "CRM", "Automation"],
    preview: {
      label: "Lead queue",
      value: "24/7",
      rows: ["Classify intent", "Draft response", "Route owner"],
    },
  },
  {
    index: "02",
    title: "Client portal",
    category: "SaaS product",
    statement: "A secure workspace for requests, files, invoices, and project status.",
    problem: "Operations lived across calls, spreadsheets, and repeated updates.",
    shipped: "Auth, dashboards, file handoff, billing states, and admin controls.",
    outcome: "The team runs service delivery from one product.",
    metric: "One source of truth",
    accent: "#60E6D2",
    stack: ["SaaS", "Auth", "Dashboard"],
    preview: {
      label: "Workspace",
      value: "Live",
      rows: ["Open requests", "Files received", "Invoice status"],
    },
  },
  {
    index: "03",
    title: "Growth website",
    category: "Web presence",
    statement: "A clear business website built to explain the offer and convert visits.",
    problem: "The old site did not make the business easy to understand or contact.",
    shipped: "Positioning, conversion pages, lead forms, analytics, and speed pass.",
    outcome: "Visitors understand the offer faster and have a direct path to enquiry.",
    metric: "Built for conversion",
    accent: "#8E7CFF",
    stack: ["Website", "SEO", "Analytics"],
    preview: {
      label: "Growth page",
      value: "Fast",
      rows: ["Offer clarity", "Trust proof", "Lead capture"],
    },
  },
  {
    index: "04",
    title: "Ops command center",
    category: "Automation",
    statement: "A back-office dashboard for orders, tasks, alerts, and reporting.",
    problem: "Daily work depended on copy-paste, late updates, and scattered reports.",
    shipped: "Database, workflow automation, admin dashboard, alerts, and reports.",
    outcome: "Less coordination, fewer missed tasks, and cleaner owner visibility.",
    metric: "Manual work reduced",
    accent: "#D7B46A",
    stack: ["Ops", "Database", "Reports"],
    preview: {
      label: "Ops board",
      value: "Synced",
      rows: ["Orders updated", "Tasks assigned", "Reports sent"],
    },
  },
];

const SystemSurface = ({ item }: { item: CaseStudy }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-[300px] items-center overflow-hidden bg-[#080807] p-5 md:min-h-[360px] md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(215,180,106,0.10),transparent_24rem)]" />
      <div className="relative z-10 mx-auto w-full max-w-[540px] rounded-lg border border-white/10 bg-[#0D0C0A]/90 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.26)] md:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
              {item.preview.label}
            </p>
            <p className="mt-2 text-2xl font-black leading-none text-white md:text-3xl">
              {item.preview.value}
            </p>
          </div>
          <span
            className="rounded-md px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#050505]"
            style={{ backgroundColor: item.accent }}
          >
            shipped
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          {item.preview.rows.map((row, rowIndex) => (
            <motion.div
              key={row}
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, delay: rowIndex * 0.08 }}
              className="flex items-center justify-between rounded-md border border-white/8 bg-white/[0.045] px-4 py-3"
            >
              <span className="text-sm font-semibold text-white/72">{row}</span>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.accent }} />
            </motion.div>
          ))}
        </div>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.span
            className="block h-full origin-left rounded-full"
            style={{ backgroundColor: item.accent }}
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

const CasePanel = ({ item }: { item: CaseStudy }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.58 }}
    className="project-panel grid min-h-[540px] w-[calc(100vw-3rem)] shrink-0 snap-start overflow-hidden rounded-lg border border-white/10 bg-[#0D0C0A] shadow-[0_36px_120px_rgba(0,0,0,0.28)] md:w-[min(62vw,900px)] lg:min-h-[500px] lg:w-[min(68vw,1020px)] lg:grid-cols-[0.44fr_0.56fr] xl:w-[min(62vw,1040px)]"
  >
    <div className="flex flex-col justify-between p-6 md:p-7 lg:p-8">
      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="text-sm font-black text-white/42">
            {item.index}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/48">
            {item.category}
          </span>
        </div>

        <h3 className="text-3xl font-black leading-[0.94] tracking-normal text-white md:text-4xl xl:text-5xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-lg text-base font-bold leading-snug text-white/72 md:text-lg">
          {item.statement}
        </p>

        <div className="mt-6 grid gap-4 border-t border-white/10 pt-5">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
              Business problem
            </p>
            <p className="text-[13px] leading-relaxed text-white/56">{item.problem}</p>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
              What shipped
            </p>
            <p className="text-[13px] leading-relaxed text-white/56">{item.shipped}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-4 text-base font-black leading-snug" style={{ color: item.accent }}>
          {item.metric}
        </p>
        <p className="mb-4 text-[13px] leading-relaxed text-white/54">
          {item.outcome}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.stack.map((stack) => (
            <span
              key={stack}
              className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/46"
            >
              {stack}
            </span>
          ))}
        </div>
      </div>
    </div>

    <SystemSurface item={item} />
  </motion.article>
);

export const WorksSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackViewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, {
    stiffness: 95,
    damping: 28,
    mass: 0.55,
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.35,
  });

  useEffect(() => {
    if (reduceMotion) {
      setTravel(0);
      return;
    }

    const viewport = trackViewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const updateTravel = () => {
      setTravel(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    updateTravel();

    const resizeObserver = new ResizeObserver(updateTravel);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateTravel);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTravel);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="selected-systems"
      className="relative overflow-visible bg-[#050505] px-6 py-24 md:py-28 lg:h-[385vh] lg:px-0 lg:py-0"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(215,180,106,0.08),transparent_26rem),radial-gradient(circle_at_80%_78%,rgba(96,230,210,0.07),transparent_30rem)]" />

      <div className="container relative z-10 mx-auto max-w-7xl lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-w-none lg:items-center lg:overflow-hidden lg:px-8 xl:px-12">
        <div className="grid w-full gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center xl:grid-cols-[260px_minmax(0,1fr)]">
          <div className="lg:self-center">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-ibda-gold">
              Selected work
            </p>
            <h2 className="max-w-[11ch] text-4xl font-black leading-[0.92] tracking-normal text-white md:text-5xl">
              Systems that ship business work.
            </h2>
            <p className="mt-6 max-w-[22rem] text-sm font-medium leading-relaxed text-white/52">
              Websites, apps, AI workflows, and automations built around real company problems.
            </p>
            <a
              href="/work"
              className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#D7B46A] px-5 py-3 text-sm font-black text-[#050505] shadow-[0_18px_45px_rgba(215,180,106,0.20)] transition-transform hover:-translate-y-0.5"
            >
              View all work
              <span aria-hidden="true">+</span>
            </a>
            <div className="mt-10 grid gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/42">
              {["Strategy", "Build", "Launch"].map((item) => (
                <span key={item} className="border-l border-white/12 pl-3">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 hidden h-1 w-full max-w-[12rem] overflow-hidden rounded-full bg-white/10 lg:block">
              <motion.span
                className="block h-full origin-left rounded-full bg-[#D7B46A]"
                style={{ scaleX: reduceMotion ? 1 : progressScale }}
              />
            </div>
          </div>

          <div
            ref={trackViewportRef}
            className="overflow-visible lg:-mr-12 lg:overflow-hidden xl:-mr-16"
          >
            <motion.div
              ref={trackRef}
              className="marquee-fade flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-6 pr-8 [scrollbar-width:none] lg:w-max lg:gap-6 lg:overflow-visible lg:pb-0 lg:pr-[18vw] [&::-webkit-scrollbar]:hidden"
              style={{ x: reduceMotion ? 0 : x }}
            >
              {cases.map((item) => (
                <CasePanel key={item.index} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
