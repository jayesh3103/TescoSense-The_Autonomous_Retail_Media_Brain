"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Wand2, Image as ImageIcon, Sparkles, ChevronRight, Play, Pause, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "../ui/Button";

interface CreativeVersion {
  stage: "draft" | "refined" | "final";
  timestamp: string;
  headline: string;
  visualDescription: string;
  imageUrl: string;
  improvements: string[];
}

const CREATIVE_EVOLUTION: CreativeVersion[] = [
  {
    stage: "draft",
    timestamp: "10:42:05 AM",
    headline: "Soup is good for rain.",
    visualDescription: "Basic bowl of soup on a table.",
    imageUrl: "https://placehold.co/600x400/2a2a2a/FFF?text=Draft:+Basic+Soup",
    improvements: ["Initial Concept", "Low Resolution"]
  },
  {
    stage: "refined",
    timestamp: "10:42:08 AM",
    headline: "Warm up with hot soup.",
    visualDescription: "Steaming tomato soup with grilled cheese.",
    imageUrl: "https://placehold.co/600x400/3a3a3a/FFF?text=Refined:+Steaming+Soup",
    improvements: ["Added 'Steam' effect", "Improved Lighting", "Sharper Text"]
  },
  {
    stage: "final",
    timestamp: "10:42:12 AM",
    headline: "Comfort in a bowl. Ready in minutes.",
    visualDescription: "Cinematic shot of organic tomato soup in a cozy kitchen setting.",
    imageUrl: "https://placehold.co/600x400/1a1a1a/FFF?text=Final:+Cinematic+Soup",
    improvements: ["Color Grading", "Brand Font Applied", "High-Res Upscale"]
  }
];

export default function CreativeLab() {
  const [currentStageIndex, setCurrentStageIndex] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVersion = CREATIVE_EVOLUTION[currentStageIndex];

  const [isLooping, setIsLooping] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStageIndex((prev) => {
          if (prev >= CREATIVE_EVOLUTION.length - 1) {
            if (isLooping) return 0;
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isLooping]);

  return (
    <Card className="col-span-1 lg:col-span-4 min-h-[500px] bg-surface/40 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-primary tracking-widest uppercase text-sm">
          <Palette size={16} />
          Real-Time Creative Evolution
        </CardTitle>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="font-mono text-xs">
             GenAI Model: Tesco-Vision-V4
           </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[450px]">
        
        {/* Left: Preview Window */}
        <div className="lg:col-span-2 relative rounded-xl overflow-hidden border border-border bg-surface group">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentVersion.stage}
              src={currentVersion.imageUrl}
              alt={currentVersion.headline}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {/* Scanning Effect Overlay */}
          <motion.div 
            key={`scan-${currentStageIndex}`}
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute left-0 right-0 h-2 bg-primary/50 shadow-[0_0_20px_#3B82F6] z-10"
          />

          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface/90 to-transparent">
            <motion.h2 
              key={currentVersion.headline}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold text-text-primary mb-2"
            >
              "{currentVersion.headline}"
            </motion.h2>
            <p className="text-text-secondary flex items-center gap-2">
              <ImageIcon size={14} />
              {currentVersion.visualDescription}
            </p>
          </div>
        </div>

        {/* Right: Controls & Timeline */}
        <div className="flex flex-col justify-between">
          
          {/* Timeline Steps */}
          <div className="space-y-6">
            {CREATIVE_EVOLUTION.map((version, index) => {
              const isActive = index === currentStageIndex;
              const isPast = index < currentStageIndex;

              return (
                <div 
                  key={index}
                  className={cn(
                    "relative pl-6 cursor-pointer transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                  )}
                  onClick={() => setCurrentStageIndex(index)}
                >
                  {/* Timeline Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border">
                    <div className={cn(
                      "absolute top-1.5 left-[-3px] w-2 h-2 rounded-full transition-colors",
                      isActive ? "bg-primary shadow-[0_0_10px_#3B82F6]" : 
                      isPast ? "bg-primary/50" : "bg-border"
                    )} />
                  </div>

                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-primary uppercase tracking-wider">
                      {version.stage}
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">
                      {version.timestamp}
                    </span>
                  </div>
                  
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="space-y-2 mt-2"
                    >
                      {version.improvements.map((imp, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-text-primary bg-surface-hover p-2 rounded">
                          <Wand2 size={12} className="text-accent" />
                          {imp}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Playback Controls */}
          <div className="bg-surface/50 p-4 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-muted uppercase tracking-wider">Evolution Playback</span>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 rounded-full hover:bg-primary/20 hover:text-primary"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={cn("h-8 w-8 p-0 rounded-full hover:bg-primary/20 hover:text-primary", isLooping && "text-primary bg-primary/10")}
                onClick={() => setIsLooping(!isLooping)}
              >
                <Repeat size={16} />
              </Button>
            </div>
            
            {/* Slider */}
            <input 
              type="range" 
              min="0" 
              max="2" 
              step="1"
              value={currentStageIndex}
              onChange={(e) => setCurrentStageIndex(parseInt(e.target.value))}
              className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <div className="flex justify-between mt-2 text-[10px] text-text-muted font-mono">
              <span>DRAFT</span>
              <span>REFINED</span>
              <span>FINAL</span>
            </div>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}
