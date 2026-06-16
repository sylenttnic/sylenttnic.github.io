"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <section className="py-16 md:py-24 bg-paper border-y border-ink/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-sm font-sans text-ink font-bold uppercase tracking-[0.3em] mb-16">
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
                <div className={cn(
                  "relative w-32 h-12 md:w-60 md:h-20 transition-all duration-500 flex items-center justify-center",
                  client.name === "By Light" ? "bg-ink p-4 rounded-sm shadow-xl" : ""
                )}>
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    className={cn(
                      "object-contain",
                      client.name === "By Light" ? "p-4" : ""
                    )}
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
