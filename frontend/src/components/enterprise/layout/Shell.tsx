"use client";

import { useStore } from "@/lib/store";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { cn } from "../ui/Button";
import CustomCursor from "@/components/ui/CustomCursor";
import Background3D from "../3d/Background3D";

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const { theme } = useStore();

  return (
    <div className={cn("flex h-screen w-full bg-background text-text-primary overflow-hidden font-sans selection:bg-primary/30 selection:text-primary transition-colors duration-300 relative", theme === 'dark' && 'dark')}>
      {/* Dynamic Background */}
      <Background3D />
      <div className="absolute inset-0 aurora-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />
      
      <CustomCursor />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth relative">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {children}
          </div>
          
          {/* Background Ambient Glow & Effects */}
          <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
             <div className="absolute inset-0 aurora-bg opacity-40" />
             <div className="scanline" />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
        </main>
      </div>
    </div>
  );
}
