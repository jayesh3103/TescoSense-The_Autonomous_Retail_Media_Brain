"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div 
        style={{ y, opacity }} 
        className="z-10 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary text-sm font-medium mb-6">
            Autonomous Retail Intelligence v2.0
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
        >
          The Brain of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">
            Retail Media
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          TescoSense autonomously detects trends, generates creative assets, and optimizes campaigns in real-time using advanced multi-agent AI.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-6 justify-center"
        >
          <MagneticButton>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,243,255,0.5)]"
            >
              Launch System
            </button>
          </MagneticButton>
          <MagneticButton>
            <button 
              onClick={() => scrollToSection('intelligence')}
              className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              View Documentation
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>
      
      {/* Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-fast" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10 ml-20 mt-20" />
    </section>
  );
}
