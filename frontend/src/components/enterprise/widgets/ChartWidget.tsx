"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { ResponsiveContainer } from "recharts";
import { cn } from "../ui/Button";

interface ChartWidgetProps {
  title: string;
  description?: string;
  children: React.ReactNode; // The Recharts component
  height?: number;
  action?: React.ReactNode;
  className?: string;
}

export default function ChartWidget({ title, description, children, height = 350, action, className }: ChartWidgetProps) {
  return (
    <Card className={cn("col-span-1 md:col-span-2 lg:col-span-4", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent>
        <div style={{ height }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
