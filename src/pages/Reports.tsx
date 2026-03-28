import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, Download, LayoutDashboard, LogOut, Settings, 
  Filter, BarChart3, Calendar, TrendingUp, Wrench 
} from "lucide-react";

const reportTypes = [
  { id: "realtime", title: "Real-time Production", desc: "Line-wise live production display", icon: TrendingUp, color: "text-primary" },
  { id: "daywise", title: "Day-wise Production", desc: "Line-wise, MTD production report", icon: Calendar, color: "text-neon-cyan" },
  { id: "monthly", title: "Monthly Report", desc: "Date-wise, line-wise, SKU-wise", icon: BarChart3, color: "text-neon-orange" },
  { id: "efficiency", title: "Mechanical Efficiency", desc: "Daily/monthly, line-wise", icon: Wrench, color: "text-neon-purple" },
];

const Reports = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [filters, setFilters] = useState({ dateFrom: "", dateTo: "", line: "", sku: "", pack: "" });

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="gradient-bg min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
        <div className="p-5 border-b border-sidebar-border">
          <h1 className="text-lg font-bold text-foreground">ACS</h1>
          <p className="text-xs text-muted-foreground">Counting System</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <button onClick={() => navigate("/dashboard")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 text-sm transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-sidebar-accent text-foreground text-sm font-medium">
            <FileText className="w-4 h-4 text-accent" /> Reports
          </button>
          <button onClick={() => navigate("/settings")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 text-sm transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="px-6 py-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Reports</h2>
          <p className="text-sm text-muted-foreground">Generate and export production reports</p>
        </header>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground">Filters</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { key: "dateFrom", label: "Date From", type: "date" },
                { key: "dateTo", label: "Date To", type: "date" },
                { key: "line", label: "Line", type: "text", placeholder: "e.g. TLCSD" },
                { key: "sku", label: "SKU", type: "text", placeholder: "e.g. SKU 0001" },
                { key: "pack", label: "Pack", type: "text", placeholder: "e.g. 12-pack" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">{label}</label>
                  <input
                    type={type}
                    value={filters[key as keyof typeof filters]}
                    onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full bg-blue-900 bg-input/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Report Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`glass-card p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                  selectedReport === report.id ? "border-primary/50 neon-glow-blue" : "hover:border-border/80"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center`}>
                    <report.icon className={`w-5 h-5 ${report.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{report.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{report.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Preview & Generate */}
          {selectedReport && (
            <div className="glass-card-glow p-6" style={{ animation: 'fade-in-up 0.3s ease-out' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Report Preview</h3>
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="btn-glow flex items-center gap-2 text-sm disabled:opacity-50"
                >
                  {generating ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Generate PDF Report
                </button>
              </div>

              {/* Mock preview */}
              <div className="bg-secondary/30 rounded-lg p-6 border border-border/50 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {generating ? "Generating report..." : "Report preview will appear here"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reports;
