"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import TiltCard from "../3d/TiltCard";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "../ui/Button";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number; // Percentage change
  trend?: "up" | "down" | "neutral";
  icon?: React.ComponentType<{ className?: string }>;
  subtext?: string;
}

export default function KPICard({ title, value, change, trend, icon: Icon, subtext }: KPICardProps) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <TiltCard>
    <Card className="relative overflow-hidden group border-border/50 bg-surface/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-1 hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
          {title}
        </CardTitle>
        {Icon && (
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
          </div>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold tracking-tight text-text-primary mb-1 group-hover:text-primary transition-all duration-300">{value}</div>
        {(change !== undefined || subtext) && (
          <div className="flex items-center text-xs">
            {change !== undefined && (
              <span
                className={cn(
                  "flex items-center font-medium mr-2 px-1.5 py-0.5 rounded backdrop-blur-md border border-white/5",
                  isPositive && "text-success bg-success/10 shadow-neon",
                  isNegative && "text-error bg-error/10",
                  trend === "neutral" && "text-text-muted bg-surface-hover"
                )}
              >
                {isPositive && <ArrowUpRight className="mr-1 h-3 w-3" />}
                {isNegative && <ArrowDownRight className="mr-1 h-3 w-3" />}
                {trend === "neutral" && <Minus className="mr-1 h-3 w-3" />}
                {Math.abs(change)}%
              </span>
            )}
            {subtext && <span className="text-text-muted group-hover:text-text-secondary transition-colors">{subtext}</span>}
          </div>
        )}
      </CardContent>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </Card>
    </TiltCard>
  );
}
