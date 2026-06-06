"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Web Development",
    desc: "Transform concepts into high-performance experiences. We engineer story-driven websites that turn your brand into a premium digital product.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    color: "#6C63FF", // IbdaDev Indigo
  },
  {
    title: "Strategic Branding",
    desc: "We build strategic identities designed to secure a premium market position. Visual systems that scale across platforms while staying bold and timeless.",
    image: "https://plus.unsplash.com/premium_photo-1661311835628-7f155dcdc0d2?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#D4A853", // IbdaDev Gold
  },
  {
    title: "Software / AI",
    desc: "We replace manual processes with intelligent software tailored to your specific operations. Custom tools and AI solutions engineered to give you an edge.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    color: "#00D4FF", // IbdaDev Cyan
  },
  {
    title: "Motion Systems",
    desc: "We build lightweight interaction and scroll systems that make the experience feel premium without slowing the page or distracting from the offer.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    color: "#7000ff",
  },
];

export const CapabilitiesStacked = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);

    cards.forEach((card, index) => {
      // Pinning each card as it reaches the top
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        pin: true,
        pinSpacing: false,
        endTrigger: containerRef.current,
        end: "bottom bottom",
      });

      // Scaling down previous card when next one overlaps
      if (index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-ibda-bg overflow-hidden py-40">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-8 px-4">Core Capabilities</h2>
      </div>
      
      <div className="flex flex-col gap-0">
        {capabilities.map((cap, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="w-full flex items-center justify-center min-h-screen py-20"
          >
            <div 
              className="w-[90%] md:w-[85%] h-[80vh] bg-ibda-surface border border-white/5 bg-black rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black/20">
                <img 
                  src={cap.image} 
                  alt={cap.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ibda-surface via-transparent to-transparent hidden md:block" />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center">
                <span 
                  className="w-12 h-1 rounded-full mb-8" 
                  style={{ backgroundColor: cap.color }}
                />
                <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
                  {cap.title}
                </h3>
                <p className="text-lg md:text-xl text-white/50 leading-relaxed font-medium mb-12 max-w-lg">
                  {cap.desc}
                </p>
                
                <a
                  href="/work#start-project"
                  className="group flex items-center gap-4 text-white font-bold tracking-widest uppercase text-sm"
                >
                  Get in Touch
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    →
                  </div>
                </a>
              </div>

              {/* Number Indicator */}
              <div className="absolute top-8 right-12 text-6xl font-black text-white/5 italic">
                0{i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Spacer for scroll end */}
      <div className="h-[20vh]" />
    </section>
  );
};
