import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Check, Play, Pause } from "lucide-react";

interface LogWalkScreenProps {
  onNavigate: (screen: string) => void;
}

export function LogWalkScreen({ onNavigate }: LogWalkScreenProps) {
  const [saved, setSaved] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [duration, setDuration] = useState("30");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onNavigate("nutrition");
    }, 1000);
  };

  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#1A202C] mb-2">Log Walk</h1>
        <p className="text-[#718096]">Track Max's exercise activity</p>
      </div>

      {/* Live Tracking Card */}
      <Card className="p-5 bg-gradient-to-br from-[#63B3ED] to-[#90CDF4] text-white border-0 shadow-lg">
        <div className="text-center space-y-4">
          <h3>Live Tracking</h3>
          <div className="text-5xl">
            {tracking ? "15:23" : "00:00"}
          </div>
          <p className="text-white/90">
            {tracking ? "Walking..." : "Start a live walk"}
          </p>
          <Button
            size="lg"
            className={`w-full ${
              tracking
                ? "bg-white text-[#2B6CB0] hover:bg-white/90"
                : "bg-[#2B6CB0] text-white hover:bg-[#2C5282]"
            }`}
            onClick={() => setTracking(!tracking)}
          >
            {tracking ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Stop Tracking
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start Tracking
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Manual Entry */}
      <div>
        <h3 className="mb-3 px-1 text-[#1A202C]">Or enter manually</h3>
        <Card className="p-5 shadow-sm border-[#E2E8F0]">
          <div className="space-y-5">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-2 bg-white"
              />
            </div>

            <div>
              <Label htmlFor="distance">Distance (miles)</Label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                placeholder="1.5"
                defaultValue="1.2"
                className="mt-2 bg-white"
              />
            </div>

            <div>
              <Label htmlFor="intensity">Intensity</Label>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="flex-1 border-[#E2E8F0] hover:bg-[#EDF2F7]">
                  Light
                </Button>
                <Button variant="outline" className="flex-1 border-[#2B6CB0] bg-[#2B6CB0]/5 hover:bg-[#2B6CB0]/10 text-[#2B6CB0]">
                  Moderate
                </Button>
                <Button variant="outline" className="flex-1 border-[#E2E8F0] hover:bg-[#EDF2F7]">
                  Vigorous
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                type="text"
                placeholder="Park walk, played fetch"
                className="mt-2 bg-white"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Presets */}
      <div>
        <h4 className="mb-3 px-1 text-[#1A202C]">Quick Presets</h4>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto py-3 border-[#E2E8F0] hover:bg-[#EDF2F7]">
            <div className="text-center">
              <div className="text-2xl mb-1">🌅</div>
              <div className="text-sm">Morning Walk</div>
              <div className="text-xs text-[#718096]">20 min</div>
            </div>
          </Button>
          <Button variant="outline" className="h-auto py-3 border-[#E2E8F0] hover:bg-[#EDF2F7]">
            <div className="text-center">
              <div className="text-2xl mb-1">🌳</div>
              <div className="text-sm">Park Visit</div>
              <div className="text-xs text-[#718096]">45 min</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <Button
        className="w-full bg-[#2B6CB0] hover:bg-[#2C5282] text-white h-12"
        onClick={handleSave}
        disabled={saved || tracking}
      >
        {saved ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Saved!
          </>
        ) : (
          "Save Walk"
        )}
      </Button>
    </div>
  );
}
