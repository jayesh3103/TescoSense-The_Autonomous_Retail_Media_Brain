"use client";

import { useEffect, useState } from "react";
import { fetchCampaigns, fetchOpportunities, fetchPerformance, triggerSimulation } from "@/lib/api";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, IndianRupee, Zap, Layers, BrainCircuit, Target, Users } from "lucide-react";
import Shell from "@/components/enterprise/layout/Shell";
import KPICard from "@/components/enterprise/widgets/KPICard";
import ChartWidget from "@/components/enterprise/widgets/ChartWidget";
import { Button } from "@/components/enterprise/ui/Button";
import { useStore } from "@/lib/store";
import Radar from "@/components/enterprise/modules/Radar";
import ReasoningEngine from "@/components/enterprise/modules/ReasoningEngine";
import CreativeLab from "@/components/enterprise/modules/CreativeLab";
import Operations from "@/components/enterprise/modules/Operations";
import Settings from "@/components/enterprise/modules/Settings";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [performance, setPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("1H");
  const [feedFilter, setFeedFilter] = useState("all");
  const { activeModule } = useStore();

  const refreshData = async () => {
    try {
      const [c, o, p] = await Promise.all([
        fetchCampaigns(),
        fetchOpportunities(),
        fetchPerformance()
      ]);
      setCampaigns(c);
      setOpportunities(o);
      setPerformance(p);
    } catch (e) {
      console.error("Failed to fetch data", e);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulate = async () => {
    setLoading(true);
    await triggerSimulation();
    await refreshData();
    setLoading(false);
  };

  const totalSpend = performance.reduce((acc, curr: any) => acc + curr.spend, 0);
  const activeCampaigns = campaigns.filter((c: any) => c.status === 'ACTIVE').length;
  const activeOpportunities = opportunities.filter((o: any) => o.status === 'OPEN').length;

  return (
    <Shell>
      {/* Executive Overview Module */}
      {activeModule === 'executive' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
              title="Total Spend" 
              value={`₹${totalSpend.toFixed(2)}`} 
              change={12.5} 
              trend="up" 
              icon={IndianRupee}
              subtext="vs last month"
            />
            <KPICard 
              title="Active Campaigns" 
              value={activeCampaigns} 
              change={-2.4} 
              trend="down" 
              icon={Layers}
              subtext="4 pending approval"
            />
            <KPICard 
              title="Opportunities" 
              value={activeOpportunities} 
              change={8.1} 
              trend="up" 
              icon={TrendingUp}
              subtext="High confidence"
            />
            <KPICard 
              title="AI Efficiency" 
              value="94.2%" 
              change={1.2} 
              trend="up" 
              icon={BrainCircuit}
              subtext="Auto-optimization rate"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartWidget 
              title="Revenue vs Spend" 
              description="Real-time financial performance tracking"
              className="lg:col-span-2"
              action={
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 bg-white/5 p-1 rounded-lg mr-2">
                    {["1H", "24H", "7D"].map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setTimeRange(range);
                          // Simulate data update
                          const multiplier = range === "1H" ? 1 : range === "24H" ? 5 : 20;
                          const newData = performance.map((p: any) => ({
                            ...p,
                            spend: p.spend * (Math.random() * 0.5 + 0.8),
                            conversions: p.conversions * (Math.random() * 0.5 + 0.8)
                          }));
                          setPerformance(newData);
                        }}
                        className={`px-3 py-1 text-xs rounded-md transition-all font-medium ${
                          timeRange === range ? "bg-primary text-white shadow-sm" : "text-text-muted hover:text-white"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    variant="glow" 
                    onClick={handleSimulate}
                    disabled={loading}
                  >
                    <Zap className={loading ? "animate-spin mr-2" : "mr-2"} size={16} />
                    {loading ? "Simulating..." : "Trigger Simulation"}
                  </Button>
                </div>
              }
            >
              <AreaChart data={performance}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="timestamp" hide />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151725', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#F3F4F6' }}
                />
                <Area type="monotone" dataKey="spend" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
                <Area type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ChartWidget>

            <div className="space-y-6">
               {/* Live Feed Widget */}
               <div className="rounded-xl border border-border bg-surface/50 backdrop-blur-md p-6 h-[420px] overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Activity className="text-primary" size={20} />
                      Live Activity
                    </h3>
                    <div className="flex gap-2 text-xs">
                      {["all", "active", "paused"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setFeedFilter(filter)}
                          className={`capitalize px-2 py-1 rounded transition-colors ${
                            feedFilter === filter ? "text-white bg-white/10" : "text-text-muted hover:text-white"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {campaigns
                      .filter((c: any) => feedFilter === "all" || c.status.toLowerCase() === feedFilter)
                      .slice(0, 8)
                      .map((c: any) => (
                      <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface hover:bg-surface-hover transition-colors border border-border/50">
                        <div className={`w-2 h-2 mt-2 rounded-full ${c.status === 'ACTIVE' ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-warning'}`} />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{c.name}</p>
                          <p className="text-xs text-text-muted">Budget: ₹{c.budget} • {c.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
                    <Button variant="ghost" size="sm" className="text-xs text-text-muted hover:text-white w-full">
                      View All Activity
                    </Button>
                  </div>
               </div>
            </div>
          </div>
        </>
      )}



      {/* Intelligence Module (Flagship) */}
      {activeModule === 'intelligence' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Top Row: Radar & Reasoning */}
          <Radar />
          <ReasoningEngine />
          
          {/* Bottom Row: Creative Lab */}
          <CreativeLab />
        </div>
      )}

      {/* Operations Module */}
      {activeModule === 'operations' && <Operations />}

      {/* Settings Module */}
      {activeModule === 'settings' && <Settings />}

      {/* Fallback for unknown modules */}
      {!['executive', 'intelligence', 'operations', 'settings'].includes(activeModule) && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-text-muted">
          <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
            <BrainCircuit size={32} className="text-primary opacity-50" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Module Under Construction</h2>
          <p>The {activeModule} module is currently being initialized by the system.</p>
        </div>
      )}
    </Shell>
  );
}
