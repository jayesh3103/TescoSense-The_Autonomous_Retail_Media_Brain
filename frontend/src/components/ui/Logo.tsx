"use client";

import { motion } from "framer-motion";

export default function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Rotating Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#logo-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="20 10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50px", originY: "50px" }}
        />

        {/* Inner Counter-Rotating Hexagon */}
        <motion.path
          d="M50 20 L76 35 V65 L50 80 L24 65 V35 Z"
          stroke="#60A5FA"
          strokeWidth="2"
          fill="rgba(59, 130, 246, 0.1)"
          initial={{ rotate: 0, scale: 0.8 }}
          animate={{ rotate: -360, scale: [0.8, 0.9, 0.8] }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ originX: "50px", originY: "50px" }}
        />

        {/* Core Pulsing Nucleus */}
        <motion.circle
          cx="50"
          cy="50"
          r="10"
          fill="#F3F4F6"
          filter="url(#glow)"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Connecting Neural Lines */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 30 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 30 * Math.sin((angle * Math.PI) / 180)}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
