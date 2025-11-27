"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5"
    >
      <div className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="text-white">Tesco</span>
        <span className="text-primary text-glow">Sense</span>
      </div>

      <div className="flex gap-6 items-center">
        {["Dashboard", "Campaigns", "Intelligence", "Settings"].map((item) => (
          <MagneticButton key={item}>
            <button 
              onClick={() => scrollToSection(item)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </button>
          </MagneticButton>
        ))}
      </div>
    </motion.nav>
  );
}
