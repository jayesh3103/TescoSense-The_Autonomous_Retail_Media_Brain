"use client";

import { useStore } from "@/lib/store";
import { Bell, Search, User, Sun, Moon } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export default function Topbar() {
  const { activeModule, theme, toggleTheme } = useStore();

  const getTitle = () => {
    switch (activeModule) {
      case 'executive': return 'Executive Overview';
      case 'operations': return 'Operations Center';
      case 'intelligence': return 'AI Intelligence Hub';
      case 'settings': return 'System Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-text-primary tracking-tight">
          {getTitle()}
        </h1>
        <Badge variant="success" className="bg-green-500/10 text-green-400 border border-green-500/20">
          ● Live
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
          <Input 
            placeholder="Search metrics, campaigns..." 
            className="pl-9 bg-background/50 border-border focus:border-primary/50"
          />
        </div>

        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-text-muted hover:text-text-primary">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse" />
        </Button>

        <div className="h-8 w-px bg-border mx-2" />

        <div 
          className="flex items-center gap-3 cursor-pointer hover:bg-surface-hover p-1.5 rounded-lg transition-colors"
          onClick={() => useStore.getState().setActiveModule('settings')}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
            JM
          </div>
          <div className="hidden md:block text-sm">
            <p className="text-text-primary font-medium leading-none">Jayesh Muley</p>
            <p className="text-text-muted text-xs">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
