"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/img/logo.webp";

interface Tool {
  name: string;
  logo: string;
}

interface Category {
  id: string;
  name: string;
  tools: Tool[];
  useCase: string;
  color: "blue" | "cyan" | "purple" | "green" | "amber";
  pos: {
    desktop: [number, number]; // [x%, y%]
    mobile: [number, number];
  };
}

const categories: Category[] = [
  {
    id: "crm",
    name: "CRM",
    tools: [
      { name: "HubSpot", logo: "/assets/img/logos/hubspot.svg" },
      { name: "Salesforce", logo: "/assets/img/logos/salesforce.svg" },
    ],
    useCase: "Sync leads from your website directly into your CRM without manual data entry.",
    color: "blue",
    pos: { desktop: [15, 30], mobile: [25, 15] },
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    tools: [
      { name: "Shopify", logo: "/assets/img/logos/shopify.svg" },
      { name: "Stripe", logo: "/assets/img/logos/stripe.svg" },
      { name: "Square", logo: "/assets/img/logos/square.svg" },
      { name: "Recharge", logo: "/assets/img/logos/recharge.svg" },
    ],
    useCase: "Sync orders to fulfillment and update inventory across all platforms in real-time.",
    color: "cyan",
    pos: { desktop: [15, 70], mobile: [75, 15] },
  },
  {
    id: "accounting",
    name: "Accounting",
    tools: [
      { name: "QuickBooks", logo: "/assets/img/logos/quickbooks.svg" },
      { name: "Xero", logo: "/assets/img/logos/xero.svg" },
      { name: "FreshBooks", logo: "/assets/img/logos/freshbooks.svg" },
    ],
    useCase: "Automatically create invoices and reconcile payments between your store and your books.",
    color: "purple",
    pos: { desktop: [85, 25], mobile: [20, 80] },
  },
  {
    id: "scheduling",
    name: "Scheduling",
    tools: [
      { name: "Calendly", logo: "/assets/img/logos/calendly.svg" },
    ],
    useCase: "Sync new appointments to your CRM and trigger automated follow-up sequences.",
    color: "green",
    pos: { desktop: [90, 50], mobile: [50, 90] },
  },
  {
    id: "operations",
    name: "Operations",
    tools: [
      { name: "ServiceTitan", logo: "/assets/img/logos/servicetitan.svg" },
      { name: "Jobber", logo: "/assets/img/logos/jobber.svg" },
      { name: "ShipStation", logo: "/assets/img/logos/shipstation.svg" },
    ],
    useCase: "Dispatch jobs to your field team and update project status automatically when completed.",
    color: "amber",
    pos: { desktop: [85, 75], mobile: [80, 80] },
  },
];

const ToolNode = ({
  category,
  isActive,
  onInteract,
  isMobile,
}: {
  category: Category;
  isActive: boolean;
  onInteract: (id: string) => void;
  isMobile: boolean;
}) => {
  const [toolIndex, setToolIndex] = useState(0);

  useEffect(() => {
    if (category.tools.length <= 1 || isActive) return;
    const interval = setInterval(() => {
      setToolIndex((prev) => (prev + 1) % category.tools.length);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [category.tools.length, isActive]);

  const currentTool = category.tools[toolIndex];
  const pos = isMobile ? category.pos.mobile : category.pos.desktop;

  const tooltipXClass = isMobile
    ? pos[0] < 35
      ? "left-0 translate-x-0 text-left"
      : pos[0] > 65
      ? "right-0 translate-x-0 text-right"
      : "left-1/2 -translate-x-1/2 text-center"
    : "left-1/2 -translate-x-1/2 text-center";

  return (
    <motion.div
      className={`absolute cursor-pointer ${isActive ? "z-50" : "z-30"}`}
      style={{
        left: `${pos[0]}%`,
        top: `${pos[1]}%`,
      }}
      initial={{ x: "-50%", y: "-50%" }}
      animate={{
        x: isActive ? "-50%" : ["-50%", "-48%", "-52%", "-50%"],
        y: isActive ? "-50%" : ["-50%", "-52%", "-48%", "-50%"],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onMouseEnter={() => !isMobile && onInteract(category.id)}
      onClick={() => isMobile && onInteract(category.id)}
    >
      <div
        className="bg-paper border border-ink/10 p-4 rounded-sm flex flex-col items-center justify-center gap-2 w-24 h-24 md:w-32 md:h-32 shadow-sm hover:border-accent/30 transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTool.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10 mb-1">
              <Image
                src={currentTool.logo}
                alt={currentTool.name}
                fill
                className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
              />
            </div>
            <span className="text-[9px] md:text-[10px] font-sans text-ink/40 text-center uppercase tracking-widest">
              {currentTool.name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={`absolute top-full mt-4 z-50 w-40 md:w-64 p-4 bg-paper border border-ink/10 rounded-sm shadow-xl text-[10px] md:text-sm text-ink/70 pointer-events-none ${tooltipXClass}`}
          >
            <div className="font-serif font-bold text-accent mb-2 tracking-tight">
              {currentTool.name}
            </div>
            {category.useCase}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DataLine = ({
  start,
  end,
  isMobile,
}: {
  start: [number, number];
  end: [number, number];
  isMobile: boolean;
}) => {
  const x1 = start[0];
  const y1 = start[1];
  const x2 = end[0];
  const y2 = end[1];

  const offset = isMobile ? 8 : 12;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const pdx = -dy;
  const pdy = dx;

  const len = Math.sqrt(pdx * pdx + pdy * pdy);
  const npdx = (pdx / len) * offset;
  const npdy = (pdy / len) * offset;

  const cp1x = x1 + (x2 - x1) * 0.4 + npdx;
  const cp1y = y1 + (y2 - y1) * 0.4 + npdy;
  const cp2x = x1 + (x2 - x1) * 0.6 + npdx;
  const cp2y = y1 + (y2 - y1) * 0.6 + npdy;

  const path = `M ${x1} ${y1} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;

  return (
    <>
      <path
        d={path}
        fill="none"
        stroke="#B5512F"
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />

      {/* Particle Inbound */}
      <rect
        width="2"
        height="0.4"
        rx="0.1"
        ry="0.1"
        fill="#B5512F"
      >
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path={path}
          keyPoints="0;1;1"
          keyTimes="0;0.4;1"
          calcMode="linear"
          rotate="auto"
        />
        <animate
          attributeName="opacity"
          values="0;0.8;0.8;0;0"
          keyTimes="0;0.02;0.38;0.4;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
    </>
  );
};

export default function IntegratorDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleInteraction = (id: string) => {
    setActiveId(id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveId(null);
    }, 6000);
  };

  const centerPos: [number, number] = isMobile ? [50, 45] : [50, 50];

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[450px] md:h-[550px] my-12">
      {/* SVG Background Layer for Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {categories.map((cat) => (
          <DataLine
            key={`line-${cat.id}`}
            start={isMobile ? cat.pos.mobile : cat.pos.desktop}
            end={centerPos}
            isMobile={isMobile}
          />
        ))}
      </svg>

      {/* Center Node */}
      <div
        className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${centerPos[0]}%`, top: `${centerPos[1]}%` }}
      >
        <motion.div
          className="w-40 h-24 md:w-64 md:h-40 rounded-sm bg-paper border border-ink/5 flex items-center justify-center p-4 md:p-8 shadow-sm"
          animate={{
            borderColor: [
              "rgba(33, 28, 23, 0.05)",
              "rgba(181, 81, 47, 0.2)",
              "rgba(33, 28, 23, 0.05)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full opacity-80">
            <Image
              src={logo}
              alt="Sylentt Partners Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Surrounding Tool Nodes */}
      {categories.map((cat) => (
        <ToolNode
          key={cat.id}
          category={cat}
          isActive={activeId === cat.id}
          onInteract={handleInteraction}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
