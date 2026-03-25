"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR } from "@/constants/colors";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project Aether",
    category: "3D Identity",
    color: "bg-blue-500/10 border-blue-500/20",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Project Sentinel",
    category: "SaaS Platform",
    color: "bg-purple-500/10 border-purple-500/20",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Project Nexus",
    category: "Web3 Ecosystem",
    color: "bg-refract-orange/10 border-refract-orange/20",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Project Chronos",
    category: "AI Dashboard",
    color: "bg-emerald-500/10 border-emerald-500/20",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
];

export const WorksSection = () => {
  const component = useRef(null);
  const slider = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          start: "top top",
          end: () => "+=" + slider.current?.offsetWidth,
          invalidateOnRefresh: true,
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="overflow-x-hidden">
      <div ref={slider} className="flex flex-nowrap w-[400vw] h-screen items-center bg-refract-bg relative">
        {/* Background Large Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
           <h1 className="text-[40vw] font-black tracking-tighter">WORKS</h1>
        </div>

        {projects.map((project, i) => (
          <section 
            key={i} 
            className="panel w-screen h-screen flex items-center justify-center p-6 md:p-24 relative z-10"
          >
            <div 
              className={`w-full max-w-6xl h-[70vh] rounded-[48px] border-2 shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 group transition-all duration-500 ${project.color}`}
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                   <span className="text-refract-orange font-bold tracking-widest uppercase text-sm mb-4 block">
                     {project.category}
                   </span>
                   <h2 className="text-5xl md:text-8xl font-black mb-6 leading-tight group-hover:translate-x-4 transition-transform duration-500">
                     {project.title.split(' ')[0]} <br />
                     <span className="text-white/30">{project.title.split(' ')[1]}</span>
                   </h2>
                </div>
                <button className="flex items-center gap-4 text-xl font-bold group/btn">
                  View Case Study
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                    ↗
                  </div>
                </button>
              </div>
              
              <div className="flex-1 relative rounded-[32px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
