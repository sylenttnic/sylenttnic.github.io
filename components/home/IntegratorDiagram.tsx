"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
    if (category.tools.length <= 1) return;
    const interval = setInterval(() => {
      setToolIndex((prev) => (prev + 1) % category.tools.length);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [category.tools.length]);

  const currentTool = category.tools[toolIndex];
  const pos = isMobile ? category.pos.mobile : category.pos.desktop;

  return (
    <motion.div
      className="absolute z-30 cursor-pointer"
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
        className={`neon-card ${category.color} p-4 rounded-xl flex flex-col items-center justify-center gap-2 w-24 h-24 md:w-32 md:h-32 shadow-lg hover:scale-105 transition-transform duration-300`}
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
                className="opacity-80 invert object-contain"
              />
            </div>
            <span className="text-[9px] md:text-[10px] font-mono text-slate-400 text-center uppercase tracking-tighter">
              {category.name}
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
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 w-40 md:w-56 p-3 bg-slate-950 border border-white/10 rounded-lg shadow-2xl text-[10px] md:text-xs text-slate-300 pointer-events-none text-center"
          >
            <div className="w-full h-0.5 mb-2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
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
  color,
  isMobile,
}: {
  start: [number, number];
  end: [number, number];
  color: string;
  isMobile: boolean;
}) => {
  const x1 = start[0];
  const y1 = start[1];
  const x2 = end[0];
  const y2 = end[1];

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Create a soft curve by offsetting the control point
  // We use the difference to bow outwards from the center
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Spline logic using cubic Bezier curves
  // We'll use two control points to create an 'S' curve or more fluid shape
  const offset = isMobile ? 8 : 12;

  // Perpendicular direction
  const pdx = -dy;
  const pdy = dx;

  // Normalize p vector
  const len = Math.sqrt(pdx * pdx + pdy * pdy);
  const npdx = (pdx / len) * offset;
  const npdy = (pdy / len) * offset;

  const cp1x = x1 + (x2 - x1) * 0.4 + npdx;
  const cp1y = y1 + (y2 - y1) * 0.4 + npdy;
  const cp2x = x1 + (x2 - x1) * 0.6 + npdx;
  const cp2y = y1 + (y2 - y1) * 0.6 + npdy;

  const path = `M ${x1} ${y1} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;

  const particleColor = {
    blue: "#3b82f6",
    cyan: "#06b6d4",
    purple: "#8b5cf6",
    green: "#10b981",
    amber: "#f59e0b",
  }[color] || "#6366f1";

  return (
    <>
      <path
        d={path}
        fill="none"
        stroke={`url(#gradient-${color})`}
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={particleColor} stopOpacity="0.1" />
          <stop offset="50%" stopColor={particleColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={particleColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Particle Inbound (Beam of light) */}
      <rect
        width="3"
        height="0.6"
        fill="white"
        style={{ filter: `drop-shadow(0 0 2px ${particleColor})` }}
      >
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path={path}
          rotate="auto"
        />
      </rect>

      {/* Particle Outbound (Beam of light) */}
      <rect
        width="3"
        height="0.6"
        fill="white"
        style={{ filter: `drop-shadow(0 0 2px ${particleColor})` }}
      >
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path={path}
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode="linear"
          rotate="auto"
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
    <div className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] my-12">
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
            color={cat.color}
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
          className="w-28 h-28 md:w-44 md:h-44 rounded-3xl bg-slate-950/80 backdrop-blur-xl border-2 border-primary/50 flex flex-col items-center justify-center text-center p-3 md:p-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          animate={{
            boxShadow: [
              "0 0 20px rgba(99,102,241,0.1)",
              "0 0 50px rgba(99,102,241,0.4)",
              "0 0 20px rgba(99,102,241,0.1)",
            ],
            borderColor: [
              "rgba(99,102,241,0.2)",
              "rgba(99,102,241,0.8)",
              "rgba(99,102,241,0.2)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="mb-2 md:mb-4 text-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <svg
              className="w-8 h-8 md:w-12 md:h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </motion.div>
          <span className="text-[8px] md:text-[10px] font-mono text-primary/70 mb-1 uppercase tracking-[0.3em]">
            Hub
          </span>
          <h3 className="text-sm md:text-xl font-bold text-white leading-tight">
            Sylentt<br />Integrator
          </h3>
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
