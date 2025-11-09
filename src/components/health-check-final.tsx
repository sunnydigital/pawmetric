import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface HealthCheckFinalProps {
  onNavigate: (screen: string, params?: any) => void;
}

const scanTypes = [
  {
    id: "eye",
    emoji: "👁️",
    title: "Eye Check",
    subtitle: "Check for redness & irritation",
    gradient: "from-blue-50 to-blue-100",
    textColor: "text-blue-900",
    iconBg: "bg-blue-500",
  },
  {
    id: "dental",
    emoji: "🦷",
    title: "Dental Scan",
    subtitle: "Check plaque & gum health",
    gradient: "from-emerald-50 to-emerald-100",
    textColor: "text-emerald-900",
    iconBg: "bg-emerald-500",
  },
  {
    id: "skin",
    emoji: "🐾",
    title: "Skin/Paw Check",
    subtitle: "Detect inflammation & lumps",
    gradient: "from-green-50 to-green-100",
    textColor: "text-green-900",
    iconBg: "bg-green-500",
  },
  {
    id: "joints",
    emoji: "🦴",
    title: "Joint Analysis",
    subtitle: "Analyze gait & mobility",
    gradient: "from-purple-50 to-purple-100",
    textColor: "text-purple-900",
    iconBg: "bg-purple-500",
  },
  {
    id: "belly",
    emoji: "🩺",
    title: "Belly Check",
    subtitle: "Check for signs of distress",
    gradient: "from-pink-50 to-pink-100",
    textColor: "text-pink-900",
    iconBg: "bg-pink-500",
  },
];

export function HealthCheckFinal({ onNavigate }: HealthCheckFinalProps) {
  return (
    <div className="pb-24 px-6 pt-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-[#111827] mb-2">AI Health Check</h1>
        <p className="text-[#6B7280]">
          Use your camera to scan and monitor Max's health
        </p>
      </div>

      {/* Start All Scans CTA */}
      <Button
        className="w-full h-14 bg-gradient-to-r from-[#2563EB] to-[#34D399] text-white hover:from-[#1D4ED8] hover:to-[#10B981] border-0 shadow-[0_8px_16px_rgba(37,99,235,0.2)] rounded-[20px] transition-all hover:shadow-[0_12px_24px_rgba(37,99,235,0.3)] hover:scale-[1.02]"
        onClick={() => onNavigate("scan-camera", { type: "all", title: "Complete Scan" })}
      >
        🔍 Start All Scans
      </Button>

      {/* Individual Scan Types */}
      <div className="space-y-3">
        {scanTypes.map((scan) => (
          <Card
            key={scan.id}
            className={`p-5 bg-gradient-to-r ${scan.gradient} border-0 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-[20px] cursor-pointer hover:shadow-[0_8px_16px_rgba(0,0,0,0.07)] transition-all hover:scale-[1.02]`}
            onClick={() => onNavigate("scan-camera", { type: scan.id, title: scan.title })}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${scan.iconBg} bg-opacity-20 flex items-center justify-center text-3xl`}>
                {scan.emoji}
              </div>
              <div className="flex-1">
                <h3 className={`${scan.textColor} mb-0.5`}>{scan.title}</h3>
                <p className={`text-sm ${scan.textColor} opacity-70`}>{scan.subtitle}</p>
              </div>
              <ChevronRight className={`w-5 h-5 ${scan.textColor} opacity-50`} />
            </div>
          </Card>
        ))}
      </div>

      {/* History Link */}
      <Button
        variant="outline"
        className="w-full border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6] rounded-[20px] h-12 transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
      >
        View Check History
      </Button>
    </div>
  );
}
