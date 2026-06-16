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
    <section className="py-24 bg-ink border-y border-paper/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-xs font-sans text-paper/60 uppercase tracking-[0.3em] mb-12">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
            {clients.map((client) => (
              <motion.a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative w-32 h-10 md:w-48 md:h-12 transition-all duration-500 opacity-100">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
