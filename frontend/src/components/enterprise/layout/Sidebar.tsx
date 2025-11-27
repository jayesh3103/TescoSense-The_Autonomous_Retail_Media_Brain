"use client";

import { BrainCircuit, LayoutDashboard, Settings, Activity, Zap, ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/enterprise/ui/Button";
import { Button } from "@/components/enterprise/ui/Button";
import Logo3D from "../3d/Logo3D";

const MENU_ITEMS = [
  { id: 'executive', label: 'Executive Overview', icon: LayoutDashboard },
  { id: 'operations', label: 'Operations', icon: Activity },
  { id: 'intelligence', label: 'AI Intelligence', icon: BrainCircuit },
  { id: 'settings', label: 'System Settings', icon: Settings },
];

export default function Sidebar() {
  const { activeModule, setActiveModule, sidebarOpen, toggleSidebar } = useStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 80 }}
      className="h-screen bg-surface/80 backdrop-blur-xl border-r border-border relative z-50 flex flex-col shadow-2xl"
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
        <div className="flex items-center gap-3 relative z-10">
          <Logo3D />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h1 className="font-bold text-xl tracking-tight text-text-primary">
                  Tesco<span className="text-primary">Sense</span>
                </h1>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">Enterprise AI</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-2 space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-gradient-to-r from-primary/10 to-transparent text-text-primary" 
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              )}
            >
              {isActive && (
                <>
                  <motion.div
                    layoutId="active-nav-glow"
                    className="absolute inset-0 bg-primary/5 blur-xl"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    layoutId="active-nav-border"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
              <Icon size={20} className={cn("flex-shrink-0 relative z-10 transition-colors", isActive && "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]")} />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap font-medium relative z-10"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Footer / Toggle */}
      <div className="p-4 border-t border-border flex flex-col gap-4">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-surface-hover text-text-muted transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </motion.aside>
  );
}
