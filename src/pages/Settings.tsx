import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings as SettingsIcon, Save, ArrowLeft } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    sapSkuCode: "",
    sapOrderNumber: "",
    batchNumber: "",
    line: "",
    linePack: "",
    flavour: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const fields = [
    { key: "sapSkuCode",      label: "SAP SKU Code",      placeholder: "Enter SKU code",      type: "text" },
    { key: "sapOrderNumber",  label: "SAP Order Number",  placeholder: "Enter order number",  type: "text" },
    { key: "batchNumber",     label: "Batch Number",       placeholder: "Enter batch number",  type: "text" },
    { key: "linePack",        label: "Line Pack",          placeholder: "Enter line pack",     type: "text" },
    { key: "flavour",         label: "Flavour",            placeholder: "Enter flavour",       type: "text" },
    { key: "startTime",       label: "Start Time",         placeholder: "",                    type: "time" },
    { key: "endTime",         label: "End Time",           placeholder: "",                    type: "time" },
  ];

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,200,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 w-full max-w-lg" style={{ animation: 'fade-in-up 0.6s ease-out' }}>
        <button
          onClick={() => navigate("/approval")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="glass-card-glow p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Line Configuration</h2>
              <p className="text-sm text-muted-foreground">Set up before starting the dashboard</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">

            {/* Line dropdown */}
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">Line</label>
              <select
                value={form.line}
                onChange={(e) => handleChange("line", e.target.value)}
                required
                className="w-full bg-input/50 border border-border bg-blue-900 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm"
              >
                <option value="" disabled>Select a line</option>
                <option value="TLCSD">TLCSD</option>
                <option value="WaterLine">WaterLine</option>
                <option value="KHS">KHS</option>
                <option value="TetraTCA">TetraTCA</option>
                <option value="TetraTBA">TetraTBA</option>
                <option value="HotFillLine">HotFillLine</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>

            {/* Rest of the fields */}
            {fields.map(({ key, label, placeholder, type }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-sm text-muted-foreground">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-input/50 border bg-blue-900 border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Configuration
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;