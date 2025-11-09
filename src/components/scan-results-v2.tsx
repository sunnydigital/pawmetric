import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle, CheckCircle, Send, Download } from "lucide-react";
import { Badge } from "./ui/badge";

interface ScanResultsV2Props {
  scanType?: string;
  scanTitle?: string;
  onNavigate: (screen: string) => void;
}

export function ScanResultsV2({ scanType = "eye", scanTitle = "Eye Check", onNavigate }: ScanResultsV2Props) {
  const healthScore = 78;
  
  const insights = [
    {
      id: 1,
      title: "Mild Redness",
      confidence: 78,
      severity: "low",
      description: "Slight inflammation detected in eye corner",
      recommendation: "Monitor for 48 hours",
    },
    {
      id: 2,
      title: "Normal Tear Production",
      confidence: 92,
      severity: "none",
      description: "Eye moisture levels appear healthy",
      recommendation: "No action needed",
    },
  ];

  return (
    <div className="pb-24 px-6 pt-6 space-y-6">
      {/* Health Score Gauge */}
      <div className="relative">
        <div className="w-48 h-48 mx-auto relative">
          {/* Circular Progress */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${healthScore * 5.53} 553`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl mb-2">{healthScore}</div>
            <div className="text-sm text-[#6B7280]">Health Score</div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <h2 className="text-[#111827] mb-2">{scanTitle} Results</h2>
          <p className="text-[#6B7280]">Scan completed • {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Overall Assessment */}
      <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-0 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-[#2563EB]" />
          </div>
          <div className="flex-1">
            <h4 className="text-[#111827] mb-1">Overall Assessment</h4>
            <p className="text-sm text-[#6B7280]">
              Minor concerns detected. Continue monitoring and follow recommendations below.
            </p>
          </div>
        </div>
      </Card>

      {/* Insight Cards */}
      <div>
        <h3 className="mb-3 px-1 text-[#111827]">Detected Insights</h3>
        <div className="space-y-3">
          {insights.map((insight) => (
            <Card key={insight.id} className="p-4 shadow-sm border-[#E5E7EB] rounded-2xl">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  insight.severity === "none" ? "bg-green-100" : "bg-yellow-100"
                }`}>
                  {insight.severity === "none" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-[#111827]">{insight.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        insight.confidence > 80 
                          ? "border-green-500 text-green-700 bg-green-50" 
                          : "border-yellow-500 text-yellow-700 bg-yellow-50"
                      }`}
                    >
                      {insight.confidence}%
                    </Badge>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-2">{insight.description}</p>
                  <p className="text-xs text-[#2563EB]">💡 {insight.recommendation}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white hover:from-[#1D4ED8] hover:to-[#3B82F6] rounded-2xl shadow-lg"
          onClick={() => onNavigate("vet-chat")}
        >
          <Send className="w-4 h-4 mr-2" />
          Send Report to Vet
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12 border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6] rounded-2xl"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF Report
        </Button>
      </div>
    </div>
  );
}
