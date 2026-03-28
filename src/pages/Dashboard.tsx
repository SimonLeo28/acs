import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera, Play, Square, Package, BoxIcon, Gauge, Clock, 
  Layers, ChevronDown, ChevronRight, LayoutDashboard, FileText, 
  LogOut, Settings, Video, Activity
} from "lucide-react";

const feeds = [
  {
    id: "feed-1",
    name: "Line 1 – TLCSD",
    camera: "CAM-01",
    status: "active" as const,
    stats: {
      pallets: 5000,
      cartons: 100000,
      fps: 30.2,
      elapsed: "04:32:18",
      frames: 489600,
    },
    skus: [
      { sku: "SKU 0001", order: "ORD-44821", pallets: 3000 },
      { sku: "SKU 0002", order: "ORD-44822", pallets: 2000 },
    ],
  },
  {
    id: "feed-2",
    name: "Line 2 – KHS",
    camera: "CAM-02",
    status: "active" as const,
    stats: {
      pallets: 3200,
      cartons: 64000,
      fps: 29.8,
      elapsed: "03:15:42",
      frames: 348200,
    },
    skus: [
      { sku: "SKU 0010", order: "ORD-55100", pallets: 2100 },
      { sku: "SKU 0011", order: "ORD-55101", pallets: 1100 },
    ],
  },
  {
    id: "feed-3",
    name: "Line 3 – WaterLine",
    camera: "CAM-03",
    status: "idle" as const,
    stats: {
      pallets: 0,
      cartons: 0,
      fps: 0,
      elapsed: "00:00:00",
      frames: 0,
    },
    skus: [],
  },
];

const neonStyle = (color: string) => {
  const map: Record<string, { color: string; shadow: string }> = {
    blue: { color: "hsl(var(--neon-blue))", shadow: "0 0 10px rgba(0,200,255,0.4)" },
    cyan: { color: "hsl(var(--neon-cyan))", shadow: "0 0 10px rgba(0,255,255,0.4)" },
    orange: { color: "hsl(var(--neon-orange))", shadow: "0 0 10px rgba(255,140,0,0.4)" },
    purple: { color: "hsl(var(--neon-purple))", shadow: "0 0 10px rgba(160,100,255,0.4)" },
    green: { color: "hsl(var(--neon-green))", shadow: "0 0 10px rgba(0,200,100,0.4)" },
  };
  return map[color] ? { color: map[color].color, textShadow: map[color].shadow } : {};
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [processingFeeds, setProcessingFeeds] = useState<string[]>(["feed-1", "feed-2"]);
  const [expandedFeeds, setExpandedFeeds] = useState<string[]>(["feed-1"]);

  const toggleProcessing = (feedId: string) => {
    setProcessingFeeds(prev =>
      prev.includes(feedId) ? prev.filter(id => id !== feedId) : [...prev, feedId]
    );
  };

  const toggleExpand = (feedId: string) => {
    setExpandedFeeds(prev =>
      prev.includes(feedId) ? prev.filter(id => id !== feedId) : [...prev, feedId]
    );
  };

  // Aggregate totals
  const totals = feeds.reduce(
    (acc, f) => ({
      pallets: acc.pallets + f.stats.pallets,
      cartons: acc.cartons + f.stats.cartons,
      activeFeeds: acc.activeFeeds + (f.status === "active" ? 1 : 0),
      totalFeeds: acc.totalFeeds + 1,
      avgFps: acc.avgFps + f.stats.fps,
      totalFrames: acc.totalFrames + f.stats.frames,
    }),
    { pallets: 0, cartons: 0, activeFeeds: 0, totalFeeds: 0, avgFps: 0, totalFrames: 0 }
  );
  totals.avgFps = totals.activeFeeds > 0 ? +(totals.avgFps / totals.activeFeeds).toFixed(1) : 0;

  const summaryStats = [
    { label: "Total Pallets", value: totals.pallets.toLocaleString(), icon: Package, neon: "blue" },
    { label: "Total Cartons", value: totals.cartons.toLocaleString(), icon: BoxIcon, neon: "cyan" },
    { label: "Active Feeds", value: `${totals.activeFeeds} / ${totals.totalFeeds}`, icon: Video, neon: "green" },
    { label: "Avg FPS", value: totals.avgFps.toString(), icon: Gauge, neon: "orange" },
    { label: "Total Frames", value: totals.totalFrames.toLocaleString(), icon: Layers, neon: "purple" },
  ];

  return (
    <div className="gradient-bg min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
        <div className="p-5 border-b border-sidebar-border">
          <h1 className="text-lg font-bold text-foreground">ACS</h1>
          <p className="text-xs text-muted-foreground">Counting System</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-sidebar-accent text-foreground text-sm font-medium">
            <LayoutDashboard className="w-4 h-4 text-primary" /> Dashboard
          </button>
          <button onClick={() => navigate("/reports")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 text-sm transition-colors">
            <FileText className="w-4 h-4" /> Reports
          </button>
          <button onClick={() => navigate("/settings")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 text-sm transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 text-sm transition-colors">
            <Settings className="w-4 h-4" /> Log Out
          </button>
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground">Automated Counting System</h2>
            <span className="live-badge">LIVE</span>
          </div>
          <span className="text-xs text-muted-foreground">{totals.activeFeeds} feed(s) active</span>
        </header>

        <div className="p-6 space-y-6">
          {/* ===== TOP: Aggregated Summary Stats ===== */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Feeds Overview</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {summaryStats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="flex items-center justify-between">
                    <span className="stat-label text-xs">{stat.label}</span>
                    <stat.icon className="w-4 h-4" style={{ color: neonStyle(stat.neon).color }} />
                  </div>
                  <span className="text-2xl font-bold" style={neonStyle(stat.neon)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ===== BOTTOM: Individual Feed Cards ===== */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Individual Feeds</h3>
            </div>

            <div className="space-y-5">
              {feeds.map((feed) => {
                const isProcessing = processingFeeds.includes(feed.id);
                const isExpanded = expandedFeeds.includes(feed.id);

                return (
                  <div key={feed.id} className="glass-card overflow-hidden">
                    {/* Feed Header */}
                    <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between bg-secondary/20">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${feed.status === "active" ? "bg-neon-green animate-pulse" : "bg-muted-foreground/40"}`} />
                        <h4 className="font-semibold text-foreground text-sm">{feed.name}</h4>
                        <span className="text-xs text-muted-foreground">({feed.camera})</span>
                      </div>
                      <span className={`text-xs font-medium uppercase tracking-wider ${feed.status === "active" ? "text-neon-green" : "text-muted-foreground"}`}>
                        {feed.status === "active" ? "Active" : "Idle"}
                      </span>
                    </div>

                    {/* Feed Content: Video + Stats side by side */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      {/* Video */}
                      <div className="lg:col-span-2 border-r border-border/30">
                        <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <Camera className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{feed.camera}</span>
                          </div>
                          <div className="text-center">
                            <Camera className="w-10 h-10 text-muted-foreground/20 mx-auto mb-1" />
                            <p className="text-xs text-muted-foreground">Live Video Feed</p>
                          </div>
                          {isProcessing && (
                            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-green/10 border border-neon-green/30">
                              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                              <span className="text-[10px] text-neon-green font-medium">Processing</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex gap-2">
                          <button
                            onClick={() => !isProcessing && toggleProcessing(feed.id)}
                            disabled={isProcessing}
                            className="btn-glow flex items-center gap-1.5 text-xs py-2 px-4 disabled:opacity-40"
                          >
                            <Play className="w-3.5 h-3.5" /> Start
                          </button>
                          <button
                            onClick={() => isProcessing && toggleProcessing(feed.id)}
                            disabled={!isProcessing}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-medium transition-all disabled:opacity-40"
                          >
                            <Square className="w-3.5 h-3.5" /> Stop
                          </button>
                        </div>
                      </div>

                      {/* Feed Stats */}
                      <div className="p-4 space-y-3">
                        {[
                          { label: "Pallets", value: feed.stats.pallets.toLocaleString(), neon: "blue", icon: Package },
                          { label: "Cartons", value: feed.stats.cartons.toLocaleString(), neon: "cyan", icon: BoxIcon },
                          { label: "FPS", value: feed.stats.fps.toString(), neon: "orange", icon: Gauge },
                          { label: "Elapsed", value: feed.stats.elapsed, neon: "purple", icon: Clock },
                          { label: "Frames", value: feed.stats.frames.toLocaleString(), neon: "green", icon: Layers },
                        ].map((s) => (
                          <div key={s.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{s.label}</span>
                            </div>
                            <span className="text-sm font-bold" style={neonStyle(s.neon)}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Production Data Accordion */}
                    {feed.skus.length > 0 && (
                      <div className="border-t border-border/50">
                        <button
                          onClick={() => toggleExpand(feed.id)}
                          className="w-full flex items-center justify-between px-5 py-2.5 hover:bg-secondary/20 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {isExpanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                            <span className="text-xs font-medium text-foreground">Production Data</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{feed.skus.length} SKUs</span>
                        </button>
                        {isExpanded && (
                          <div className="divide-y divide-border/50 bg-secondary/10">
                            {feed.skus.map((item) => (
                              <div key={item.sku} className="flex items-center justify-between px-5 py-2.5 pl-10">
                                <div>
                                  <span className="text-sm font-medium text-foreground">{item.sku}</span>
                                  <span className="text-xs text-muted-foreground ml-3">{item.order}</span>
                                </div>
                                <span className="text-sm font-semibold neon-text-blue">{item.pallets.toLocaleString()} pallets</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
