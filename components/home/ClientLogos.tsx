"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  {
    name: "By Light",
    logo: "/assets/img/logos/bylight.svg",
    url: "https://bylight.com/",
  },
  {
    name: "edZOOcation",
    logo: "/assets/img/logos/edzoocation.svg",
    url: "https://edzoocation.com/",
  },
];

export default function ClientLogos() {
  return (
    <section className="py-12 bg-slate-950/50 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-sm font-mono text-slate-500 uppercase tracking-[0.3em] mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            {clients.map((client) => (
              <motion.a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-32 h-12 md:w-48 md:h-16 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    className="object-contain invert brightness-[2] group-hover:brightness-100"
                  />
                </div>
                {/* Subtle Glow Effect on Hover */}
                <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
