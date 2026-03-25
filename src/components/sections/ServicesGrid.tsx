"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { COLOR } from "@/constants/colors";

const services = [
  {
    title: "Brand Identity",
    description: "We craft unique visual languages that resonate with your audience and define your digital presence.",
    icon: "🎨",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "3D Development",
    description: "Immersive WebGL experiences that push the boundaries of modern browser capabilities.",
    icon: "🧊",
    className: "md:col-span-1 md:row-span-2 bg-refract-orange/5 border-refract-orange/20",
  },
  {
    title: "Performance",
    description: "Lightweight, lightning-fast applications built for the modern web.",
    icon: "⚡",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "UI/UX Design",
    description: "Precision-engineered interfaces designed for maximum user engagement and conversion.",
    icon: "✨",
    className: "md:col-span-1 md:row-span-1",
  },
];

export const ServicesGrid = () => {
  return (
    <section className="py-24 px-6 bg-refract-bg">
      <div className="container mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-refract-orange">Capabilities</span></h2>
          <p className="text-white/40 max-w-xl">
            We deliver state-of-the-art digital solutions using the most advanced technologies available today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all duration-300",
                service.className
              )}
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
