import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, Bone, Footprints as Paw, Activity, ChevronRight } from "lucide-react";

interface HealthCheckScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

const scanTypes = [
  {
    id: "eye",
    icon: Eye,
    title: "Eye Check",
    emoji: "👁️",
    description: "Check redness or irritation",
    color: "from-blue-50 to-blue-100",
  },
  {
    id: "dental",
    icon: Activity,
    title: "Dental Scan",
    emoji: "🦷",
    description: "Check plaque, gum health",
    color: "from-cyan-50 to-cyan-100",
  },
  {
    id: "joints",
    icon: Bone,
    title: "Joint Check",
    emoji: "🦴",
    description: "Analyze gait or mobility",
    color: "from-indigo-50 to-indigo-100",
  },
  {
    id: "skin",
    icon: Paw,
    title: "Skin/Paw/Belly",
    emoji: "🐾",
    description: "Detect inflammation, lumps",
    color: "from-purple-50 to-purple-100",
  },
];

export function HealthCheckScreen({ onNavigate }: HealthCheckScreenProps) {
  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#1A202C] mb-2">AI Health Check</h1>
        <p className="text-[#718096]">
          Use your camera to scan and monitor your dog's health
        </p>
      </div>

      {/* Scan Types Grid */}
      <div className="grid grid-cols-1 gap-4">
        {scanTypes.map((scan) => (
          <Card
            key={scan.id}
            className="p-5 shadow-md border-[#E2E8F0] hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onNavigate("scan-camera", { type: scan.id, title: scan.title })}
          >
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scan.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-3xl">{scan.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[#1A202C] mb-1">{scan.title}</h3>
                <p className="text-sm text-[#718096]">{scan.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#CBD5E0]" />
            </div>
            <Button
              className="w-full mt-4 bg-[#2B6CB0] hover:bg-[#2C5282] text-white"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("scan-camera", { type: scan.id, title: scan.title });
              }}
            >
              Start Scan
            </Button>
          </Card>
        ))}
      </div>

      {/* View History Button */}
      <Button
        variant="outline"
        className="w-full border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#EDF2F7]"
        onClick={() => onNavigate("scan-history")}
      >
        View Check History
      </Button>
    </div>
  );
}
