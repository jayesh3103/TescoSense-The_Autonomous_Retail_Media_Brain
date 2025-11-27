"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export default function GlassCard({ children, className, delay = 0, id }: GlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={twMerge(
        "glass-card rounded-xl p-6 relative overflow-hidden group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
