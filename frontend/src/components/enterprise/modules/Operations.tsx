"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Activity, AlertTriangle, CheckCircle, Shield, Globe, Cpu, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "../ui/Button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SYSTEM_METRICS = [
  { name: "CPU Usage", value: "42%", status: "healthy", icon: Cpu },
  { name: "Memory", value: "6.8 GB", status: "healthy", icon: Database },
  { name: "API Latency", value: "45ms", status: "healthy", icon: Activity },
  { name: "Uptime", value: "99.99%", status: "healthy", icon: Server },
];

const INCIDENT_LOG = [
  { id: 1, time: "10:42:05", level: "warning", message: "High latency detected in region: eu-west-1", service: "AdExchange" },
  { id: 2, time: "10:38:12", level: "info", message: "Auto-scaling triggered: +2 instances", service: "Compute" },
  { id: 3, time: "10:15:00", level: "success", message: "Daily backup completed successfully", service: "Database" },
  { id: 4, time: "09:55:23", level: "info", message: "New campaign ruleset deployed", service: "StrategyAgent" },
  { id: 5, time: "09:30:11", level: "error", message: "Failed to sync creative assets (Retrying...)", service: "CDN" },
];

const MOCK_TRAFFIC_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  requests: Math.floor(Math.random() * 500) + 1000,
  errors: Math.floor(Math.random() * 50),
}));

export default function Operations() {
  const [metrics, setMetrics] = useState(SYSTEM_METRICS);
  const [trafficData, setTrafficData] = useState(MOCK_TRAFFIC_DATA);
  const [incidents, setIncidents] = useState(INCIDENT_LOG);
  const [timeRange, setTimeRange] = useState("1H");
  const [incidentFilter, setIncidentFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate Real-time Metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => {
        if (m.name === "CPU Usage") return { ...m, value: `${Math.floor(Math.random() * 30) + 20}%` };
        if (m.name === "API Latency") return { ...m, value: `${Math.floor(Math.random() * 20) + 30}ms` };
        return m;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics(prev => prev.map(m => {
        if (m.name === "Memory") return { ...m, value: `${(Math.random() * 2 + 5).toFixed(1)} GB` };
        return m;
      }));
      setIsRefreshing(false);
    }, 1000);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // Simulate data change
    const length = range === "1H" ? 20 : range === "24H" ? 12 : 7;
    const newData = Array.from({ length }, (_, i) => ({
      time: i,
      requests: Math.floor(Math.random() * 500) + (range === "1H" ? 1000 : range === "24H" ? 5000 : 20000),
      errors: Math.floor(Math.random() * (range === "1H" ? 50 : range === "24H" ? 200 : 500)),
    }));
    setTrafficData(newData);
  };

  const handleAcknowledge = (id: number) => {
    setIncidents(prev => prev.filter(i => i.id !== id));
  };

  const filteredIncidents = incidents.filter(i => {
    if (incidentFilter === "all") return true;
    return i.level === incidentFilter;
  });

  return (
    <div className="space-y-6">
      {/* System Health Grid */}
      <div className="flex justify-end mb-[-1rem] relative z-10">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleRefresh}
          className="h-8 text-xs border-white/10 hover:bg-white/5 text-text-secondary"
        >
          <Activity size={14} className={cn("mr-2", isRefreshing && "animate-spin")} />
          Refresh Status
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.name} className="bg-surface/50 border-border">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted mb-1">{metric.name}</p>
                <div className="text-2xl font-bold text-text-primary tabular-nums">{metric.value}</div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <metric.icon size={24} />
              </div>
            </CardContent>
            <div className="h-1 w-full bg-surface-hover">
              <div className="h-full bg-success w-full animate-pulse" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Traffic Chart */}
        <Card className="lg:col-span-2 bg-surface/40 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Globe size={18} className="text-primary" />
              Global Traffic & Error Rate
            </CardTitle>
            <div className="flex gap-1 bg-surface-hover p-1 rounded-lg">
              {["1H", "24H", "7D"].map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-md transition-all font-medium",
                    timeRange === range ? "bg-primary text-white shadow-sm" : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorErr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border), 0.1)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="rgb(var(--text-muted))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgb(var(--surface))', borderColor: 'rgba(var(--border), 0.5)', borderRadius: '8px', color: 'rgb(var(--text-primary))' }}
                  itemStyle={{ color: 'rgb(var(--text-primary))' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
                <Area type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorErr)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Incident Log */}
        <Card className="bg-surface/50 border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield size={18} className="text-secondary" />
              Incident Log
            </CardTitle>
            <div className="flex gap-2 text-xs">
              {["all", "error", "warning"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setIncidentFilter(filter)}
                  className={cn(
                    "capitalize px-2 py-1 rounded transition-colors",
                    incidentFilter === filter ? "text-white bg-primary" : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredIncidents.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center text-text-muted py-8 text-sm"
                  >
                    No active incidents.
                  </motion.div>
                ) : (
                  filteredIncidents.map((log) => (
                    <motion.div 
                      key={log.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-3 rounded-lg bg-surface hover:bg-surface-hover border border-border transition-colors group relative"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                          log.level === "error" ? "bg-error/20 text-error" :
                          log.level === "warning" ? "bg-warning/20 text-warning" :
                          log.level === "success" ? "bg-success/20 text-success" :
                          "bg-primary/20 text-primary"
                        )}>
                          {log.level}
                        </span>
                        <span className="text-[10px] text-text-muted font-mono">{log.time}</span>
                      </div>
                      <p className="text-sm text-text-primary font-medium">{log.message}</p>
                      <p className="text-xs text-text-muted mt-1">Service: {log.service}</p>
                      
                      <button 
                        onClick={() => handleAcknowledge(log.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface rounded text-text-muted hover:text-text-primary"
                        title="Acknowledge"
                      >
                        <CheckCircle size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
