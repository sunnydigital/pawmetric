import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle, CheckCircle, MapPin, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

interface ScanResultsScreenProps {
  scanType?: string;
  scanTitle?: string;
  onNavigate: (screen: string) => void;
}

export function ScanResultsScreen({ scanType = "eye", scanTitle = "Eye Check", onNavigate }: ScanResultsScreenProps) {
  const findings = [
    {
      id: 1,
      title: "Eyelid Lump",
      confidence: 65,
      severity: "low",
      description: "Small bump detected on lower eyelid",
    },
    {
      id: 2,
      title: "Mild Redness",
      confidence: 82,
      severity: "medium",
      description: "Slight inflammation in eye corner",
    },
  ];

  const recommendations = [
    { text: "Monitor for 48 hours", icon: Calendar },
    { text: "Clean with warm water twice daily", icon: CheckCircle },
    { text: "Book vet visit if swelling increases", icon: AlertCircle },
  ];

  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#1A202C] mb-2">{scanTitle} Results</h1>
        <p className="text-[#718096]">Scan completed on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Overall Score */}
      <Card className="p-5 bg-gradient-to-br from-[#2B6CB0] to-[#63B3ED] text-white border-0 shadow-lg">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-white/80 text-sm mb-1">Overall Assessment</p>
            <h2 className="text-white">Mild Concerns Detected</h2>
          </div>
          <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
            78% Confidence
          </Badge>
        </div>
        <p className="text-white/90 text-sm">
          We detected some minor issues that should be monitored. No immediate action required.
        </p>
      </Card>

      {/* Findings */}
      <div>
        <h3 className="mb-3 px-1 text-[#1A202C]">Detected Findings</h3>
        <div className="space-y-3">
          {findings.map((finding) => (
            <Card key={finding.id} className="p-4 shadow-sm border-[#E2E8F0]">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-lg bg-[#EDF2F7] flex items-center justify-center flex-shrink-0">
                  {finding.severity === "low" ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-[#1A202C]">{finding.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        finding.confidence > 75 
                          ? "border-green-500 text-green-700" 
                          : "border-yellow-500 text-yellow-700"
                      }`}
                    >
                      {finding.confidence}%
                    </Badge>
                  </div>
                  <p className="text-sm text-[#718096]">{finding.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="mb-3 px-1 text-[#1A202C]">Recommendations</h3>
        <Card className="p-5 shadow-sm border-[#E2E8F0]">
          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EDF2F7] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#2B6CB0]" />
                  </div>
                  <p className="text-[#1A202C] flex-1 pt-1">{rec.text}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full bg-[#2B6CB0] hover:bg-[#2C5282] text-white h-12">
          <MapPin className="w-4 h-4 mr-2" />
          Find a Vet Near Me
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#EDF2F7] h-12"
          onClick={() => onNavigate("health-check")}
        >
          Do Another Scan
        </Button>
      </div>
    </div>
  );
}
