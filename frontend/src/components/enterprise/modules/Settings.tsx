"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import { cn } from "../ui/Button";

const TABS = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "data", label: "Data Sources", icon: Database },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[600px]">
      {/* Sidebar Navigation */}
      <Card className="col-span-1 bg-surface/50 border-border h-fit">
        <CardContent className="p-4 space-y-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
                activeTab === tab.id 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Content Area */}
      <Card className="col-span-1 lg:col-span-3 bg-surface/40 border-primary/20">
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage your enterprise dashboard preferences and system parameters.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {activeTab === "general" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Dashboard Preferences</h3>
                
                <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-text-primary">Autonomous Agent Mode</p>
                    <p className="text-sm text-text-muted">Allow AI agents to execute campaigns without manual approval.</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div>
                    <p className="font-medium text-text-primary">Dark Mode</p>
                    <p className="text-sm text-text-muted">Force high-contrast dark theme for enterprise displays.</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Regional Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Default Currency</label>
                    <Input defaultValue="USD ($)" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Timezone</label>
                    <Input defaultValue="UTC (GMT+0)" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "data" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Connected Data Sources</h3>
                
                {[
                  { name: "Tesco Sales API", status: "Connected", lastSync: "2 mins ago" },
                  { name: "Weather.com API", status: "Connected", lastSync: "5 mins ago" },
                  { name: "Google Trends", status: "Connected", lastSync: "1 hour ago" },
                  { name: "Competitor Scraper", status: "Warning", lastSync: "4 hours ago" },
                ].map((source, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Database size={18} className="text-text-muted" />
                      <div>
                        <p className="font-medium text-text-primary">{source.name}</p>
                        <p className="text-xs text-text-muted">Last sync: {source.lastSync}</p>
                      </div>
                    </div>
                    <Badge variant={source.status === "Connected" ? "success" : "warning"}>
                      {source.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "account" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Profile Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Full Name</label>
                    <Input defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Email Address</label>
                    <Input defaultValue="admin@tescosense.ai" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Role</label>
                    <Input defaultValue="Super Admin" disabled className="opacity-50 cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Change Password</h3>
                <div className="space-y-3 max-w-md">
                  <Input type="password" placeholder="Current Password" />
                  <Input type="password" placeholder="New Password" />
                  <Input type="password" placeholder="Confirm New Password" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Notification Channels</h3>
                {[
                  { label: "Email Notifications", desc: "Receive daily summaries and critical alerts via email." },
                  { label: "Push Notifications", desc: "Real-time browser alerts for high-priority events." },
                  { label: "Slack Integration", desc: "Forward system logs to the #ops-monitoring channel." },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-text-primary">{item.label}</p>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
                      <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Alert Thresholds</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">CPU Usage Warning</span>
                      <span className="text-primary">80%</span>
                    </div>
                    <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[80%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Budget Cap Alert</span>
                      <span className="text-warning">95%</span>
                    </div>
                    <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
                      <div className="h-full bg-warning w-[95%]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-text-primary">Two-Factor Authentication (2FA)</p>
                    <p className="text-sm text-text-muted">Secure your account with an authenticator app.</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-primary border-primary/20 hover:bg-primary/10">
                    Enable 2FA
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: "MacBook Pro 16", location: "London, UK", ip: "192.168.1.1", active: "Now" },
                    { device: "iPhone 15 Pro", location: "London, UK", ip: "10.0.0.5", active: "2h ago" },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-surface rounded border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface flex items-center justify-center">
                          <Shield size={14} className="text-text-muted" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{session.device}</p>
                          <p className="text-xs text-text-muted">{session.location} • {session.ip}</p>
                        </div>
                      </div>
                      <Badge variant={session.active === "Now" ? "success" : "secondary"}>
                        {session.active}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">API Keys</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-text-muted">Manage access keys for external integrations.</p>
                  <Button size="sm" variant="outline">Generate New Key</Button>
                </div>
                <div className="p-3 bg-surface-hover border border-border rounded font-mono text-xs text-text-secondary flex justify-between items-center">
                  <span>sk_live_51Mz...92xP</span>
                  <span className="text-error cursor-pointer hover:underline">Revoke</span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-end pt-6 border-t border-border">
            <Button onClick={handleSave} disabled={isSaving} className="min-w-[120px]">
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
