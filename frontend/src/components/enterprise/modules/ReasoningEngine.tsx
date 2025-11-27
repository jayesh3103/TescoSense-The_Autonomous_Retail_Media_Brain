"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Lightbulb, Target, CheckCircle2, ArrowRight, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { cn } from "../ui/Button";

interface ReasoningNode {
  id: string;
  step: string;
  description: string;
  confidence: number;
  status: "completed" | "processing" | "pending";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  details: string[];
}

const REASONING_CHAIN: ReasoningNode[] = [
  {
    id: "1",
    step: "Signal Detection",
    description: "Identified high-value opportunity from weather + sales correlation.",
    confidence: 98,
    status: "completed",
    icon: Lightbulb,
    details: ["Weather: Heavy Rain forecast (London)", "Sales: Soup category +15% WoW", "Sentiment: Positive for 'comfort food'"]
  },
  {
    id: "2",
    step: "Strategy Formulation",
    description: "Selected 'Aggressive Growth' strategy with dynamic budget allocation.",
    confidence: 92,
    status: "completed",
    icon: Target,
    details: ["Objective: Maximize Conversion Volume", "Budget: $850 (Dynamic)", "Channels: Display + Social"]
  },
  {
    id: "3",
    step: "Creative Generation",
    description: "Generating 3 variants of 'Comfort Food' assets.",
    confidence: 88,
    status: "processing",
    icon: BrainCircuit,
    details: ["Headline: 'Warm up this weekend'", "Visual: Steaming bowl (GenAI)", "Tone: Cozy, inviting"]
  },
  {
    id: "4",
    step: "Execution",
    description: "Waiting for final approval to push to ad exchanges.",
    confidence: 0,
    status: "pending",
    icon: CheckCircle2,
    details: ["Platform: Google DV360", "Bid Strategy: Target CPA", "Safety: Brand Safe"]
  }
];

export default function ReasoningEngine() {
  const [activeNode, setActiveNode] = useState<string | null>("3");

  return (
    <Card className="col-span-1 lg:col-span-2 min-h-[500px] bg-surface/40 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-primary tracking-widest uppercase text-sm">
          <BrainCircuit size={16} />
          AI Reasoning Engine
        </CardTitle>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 text-xs border-primary/20 hover:bg-primary/10 text-primary"
          onClick={() => {
            let step = 0;
            const interval = setInterval(() => {
              setActiveNode(REASONING_CHAIN[step].id);
              step++;
              if (step >= REASONING_CHAIN.length) clearInterval(interval);
            }, 2000);
          }}
        >
          <Play size={12} className="mr-2" />
          Run Simulation
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[450px]">
        
        {/* Left: Node Graph */}
        <div className="relative flex flex-col justify-between py-4 pl-4">
          {/* Connecting Line */}
          <div className="absolute left-[2.25rem] top-8 bottom-8 w-0.5 bg-border -z-10" />
          
          {REASONING_CHAIN.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeNode === node.id;
            const isCompleted = node.status === "completed";
            const isProcessing = node.status === "processing";

            return (
              <motion.div 
                key={node.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center gap-4 group cursor-pointer"
                onClick={() => setActiveNode(node.id)}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-background",
                  isActive ? "border-primary shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110" : 
                  isCompleted ? "border-success text-success" : "border-border text-text-muted"
                )}>
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon size={18} className={isActive ? "text-primary" : ""} />
                  )}
                </div>
                
                <div className={cn(
                  "flex-1 p-3 rounded-lg border transition-all duration-300",
                  isActive ? "bg-primary/10 border-primary/30" : "bg-transparent border-transparent group-hover:bg-surface-hover"
                )}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={cn("font-semibold text-sm", isActive ? "text-text-primary" : "text-text-secondary")}>
                      {node.step}
                    </h4>
                    {node.confidence > 0 && (
                      <span className={cn("text-xs font-mono", isActive ? "text-primary" : "text-text-muted")}>
                        {node.confidence}% Conf.
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted line-clamp-1">{node.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Detail Panel */}
        <div className="bg-surface/50 rounded-xl border border-border p-6 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col"
              >
                {(() => {
                  const node = REASONING_CHAIN.find(n => n.id === activeNode);
                  if (!node) return null;
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                          <node.icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-text-primary">{node.step}</h3>
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-bold",
                            node.status === "completed" ? "bg-success/20 text-success" :
                            node.status === "processing" ? "bg-primary/20 text-primary animate-pulse" :
                            "bg-gray-500/20 text-gray-400"
                          )}>
                            {node.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h5 className="text-sm font-medium text-text-secondary mb-2 uppercase tracking-wider">Reasoning</h5>
                          <p className="text-text-primary leading-relaxed">
                            {node.description}
                          </p>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-text-secondary mb-2 uppercase tracking-wider">Key Factors</h5>
                          <ul className="space-y-2">
                            {node.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                                <ArrowRight size={14} className="mt-1 text-primary/50" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Decorative Code Block */}
                      <div className="mt-auto pt-6">
                         <div className="bg-surface-hover rounded-lg p-3 font-mono text-xs text-primary/70 overflow-hidden">
                           <div className="opacity-50">
                             {`> Analyzing input vectors...`} <br/>
                             {`> Confidence score: ${node.confidence / 100}`} <br/>
                             {`> Node ID: ${node.id}_${node.step.replace(" ", "_").toUpperCase()}`}
                           </div>
                         </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10" />
        </div>

      </CardContent>
    </Card>
  );
}
