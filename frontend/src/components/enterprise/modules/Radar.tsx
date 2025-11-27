"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudRain, TrendingUp, ShoppingCart, AlertTriangle, Search, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { cn } from "../ui/Button";

interface Signal {
  id: string;
  type: "weather" | "sales" | "trend" | "competitor";
  strength: number; // 0-100
  angle: number; // 0-360 degrees
  distance: number; // 0-100% from center
  label: string;
  details: string;
}

const MOCK_SIGNALS: Signal[] = [
  { id: "1", type: "weather", strength: 85, angle: 45, distance: 60, label: "Storm Front", details: "High demand for comfort food expected" },
  { id: "2", type: "sales", strength: 92, angle: 120, distance: 40, label: "Soup Spike", details: "+400% sales velocity in North region" },
  { id: "3", type: "trend", strength: 78, angle: 200, distance: 75, label: "Viral Recipe", details: "TikTok trend: 'Spicy Tomato Soup'" },
  { id: "4", type: "competitor", strength: 45, angle: 300, distance: 85, label: "Price Drop", details: "Competitor X lowered soup prices by 10%" },
  { id: "5", type: "search", strength: 65, angle: 10, distance: 50, label: "Search Surge", details: "Keywords: 'Umbrella', 'Hot Chocolate'" },
] as any;

export default function Radar() {
  const [activeSignal, setActiveSignal] = useState<Signal | null>(null);
  const [rotation, setRotation] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rotation > 0) {
      interval = setInterval(() => {
        setRotation((prev) => (prev + 2) % 360 || 1); // Ensure it doesn't get stuck at 0
      }, 20);
    }
    return () => clearInterval(interval);
  }, [rotation]);

  return (
    <Card className="col-span-1 lg:col-span-2 min-h-[500px] relative overflow-hidden bg-surface/40 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-primary tracking-widest uppercase text-sm">
          <Zap size={16} />
          Marketing Weather Radar
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted uppercase tracking-wider">Active Scan</span>
          <div 
            className={cn("w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors", rotation > 0 ? "bg-primary" : "bg-border")}
            onClick={() => setRotation(prev => prev === 0 ? 1 : 0)}
          >
            <motion.div 
              className="w-3 h-3 bg-surface rounded-full shadow-sm"
              animate={{ x: rotation > 0 ? 16 : 0 }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative h-[450px] flex items-center justify-center">
        
        {/* Radar Grid */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-primary/20 relative">
            <div className="absolute inset-0 rounded-full border border-primary/10 scale-75" />
            <div className="absolute inset-0 rounded-full border border-primary/10 scale-50" />
            <div className="absolute inset-0 rounded-full border border-primary/10 scale-25" />
            
            {/* Crosshairs */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary/10" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-primary/10" />
          </div>
        </div>

        {/* Scanner Line */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full relative">
            <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-r from-transparent to-primary/20 origin-bottom-left" 
                 style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
            <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-primary/50 shadow-[0_0_10px_#3B82F6]" />
          </div>
        </div>

        {/* Signals */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
            {MOCK_SIGNALS.map((signal: any) => {
              const x = 50 + (signal.distance / 2) * Math.cos((signal.angle * Math.PI) / 180);
              const y = 50 + (signal.distance / 2) * Math.sin((signal.angle * Math.PI) / 180);
              
              const Icon = 
                signal.type === "weather" ? CloudRain :
                signal.type === "sales" ? ShoppingCart :
                signal.type === "trend" ? TrendingUp :
                signal.type === "search" ? Search : AlertTriangle;

              const color = 
                signal.type === "weather" ? "text-blue-400" :
                signal.type === "sales" ? "text-green-400" :
                signal.type === "trend" ? "text-purple-400" :
                "text-yellow-400";

              return (
                <motion.button
                  key={signal.id}
                  className={cn(
                    "absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center rounded-full bg-surface/80 border border-border hover:border-primary hover:bg-primary/20 transition-all z-10",
                    activeSignal?.id === signal.id && "border-primary bg-primary/20 scale-125 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setActiveSignal(signal)}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icon size={14} className={color} />
                  {/* Pulse Effect */}
                  <div className={cn("absolute inset-0 rounded-full animate-ping opacity-20", color.replace("text-", "bg-"))} />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Signal Details Panel */}
        <AnimatePresence>
          {activeSignal && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 w-64 bg-surface/90 backdrop-blur-md border border-primary/30 p-4 rounded-lg shadow-xl z-20"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-primary">{activeSignal.label}</h4>
                <button onClick={() => setActiveSignal(null)} className="text-text-muted hover:text-text-primary">×</button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Type:</span>
                  <span className="uppercase text-xs font-bold">{activeSignal.type}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Strength:</span>
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-primary" style={{ width: `${activeSignal.strength}%` }} />
                  </div>
                </div>
                <p className="text-text-primary mt-2 border-t border-border pt-2">
                  {activeSignal.details}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </CardContent>
    </Card>
  );
}
