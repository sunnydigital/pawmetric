import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface HealthCheckV2Props {
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
  },
  {
    id: "dental",
    emoji: "🦷",
    title: "Dental Scan",
    subtitle: "Check plaque & gum health",
    gradient: "from-cyan-50 to-cyan-100",
    textColor: "text-cyan-900",
  },
  {
    id: "skin",
    emoji: "🐾",
    title: "Skin/Paw Check",
    subtitle: "Detect inflammation & lumps",
    gradient: "from-emerald-50 to-emerald-100",
    textColor: "text-emerald-900",
  },
  {
    id: "joints",
    emoji: "🦴",
    title: "Joint Analysis",
    subtitle: "Analyze gait & mobility",
    gradient: "from-purple-50 to-purple-100",
    textColor: "text-purple-900",
  },
  {
    id: "belly",
    emoji: "🩺",
    title: "Belly Check",
    subtitle: "Check for signs of distress",
    gradient: "from-pink-50 to-pink-100",
    textColor: "text-pink-900",
  },
];

export function HealthCheckV2({ onNavigate }: HealthCheckV2Props) {
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
        className="w-full h-14 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white hover:from-[#1D4ED8] hover:to-[#3B82F6] border-0 shadow-lg rounded-2xl"
        onClick={() => onNavigate("scan-camera", { type: "all", title: "Complete Scan" })}
      >
        🔍 Start All Scans
      </Button>

      {/* Individual Scan Types */}
      <div className="space-y-3">
        {scanTypes.map((scan) => (
          <Card
            key={scan.id}
            className={`p-5 bg-gradient-to-r ${scan.gradient} border-0 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-all`}
            onClick={() => onNavigate("scan-camera", { type: scan.id, title: scan.title })}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{scan.emoji}</div>
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
        className="w-full border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6] rounded-2xl h-12"
      >
        View Check History
      </Button>
    </div>
  );
}
