import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, CheckCircle2 } from "lucide-react";

const Approval = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,200,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 text-center max-w-2xl w-full" style={{ animation: 'fade-in-up 0.6s ease-out' }}>
        {/* Approval message */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-green/10 border border-neon-green/30 mb-4">
            <CheckCircle2 className="w-10 h-10 text-neon-green" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Access Approved</h1>
          <p className="text-muted-foreground">Welcome to the Automated Counting System. Select a module to continue.</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/settings")}
            className="glass-card-glow p-8 text-left group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:neon-glow-blue transition-all duration-300">
              <LayoutDashboard className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Dashboard</h3>
            <p className="text-sm text-muted-foreground">Monitor live production counting and analytics</p>
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="glass-card-glow p-8 text-left group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-accent/40"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:neon-glow-orange transition-all duration-300">
              <FileText className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Reports</h3>
            <p className="text-sm text-muted-foreground">Generate and export production reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Approval;
