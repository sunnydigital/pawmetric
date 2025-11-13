import { Button } from "./ui/button";
import { Camera, Zap, Image, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface DocumentScannerCameraProps {
  onNavigate: (screen: string, params?: any) => void;
}

const documentCategories = [
  { id: "vaccination", label: "Vaccination", icon: "💉" },
  { id: "prescription", label: "Prescription", icon: "📋" },
  { id: "diagnosis", label: "Diagnosis", icon: "🏥" },
  { id: "other", label: "Other", icon: "📄" },
];

export function DocumentScannerCamera({ onNavigate }: DocumentScannerCameraProps) {
  const [flash, setFlash] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("vaccination");
  const [progress, setProgress] = useState(0);

  const handleCapture = () => {
    setScanning(true);
    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onNavigate("document-scan-results", {
            type: "document",
            category: selectedCategory,
            title: "Document Scanned"
          });
        }, 300);
      }
    }, 100);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#1F2937] via-[#111827] to-[#0F172A]">
      {/* Header */}
      <div className="p-8 text-center">
        <h3 className="text-white mb-2">Scan Pet Document</h3>
        <p className="text-white/60 text-sm">Position the document in the frame</p>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center px-6">
        {/* Rectangle Scan Viewport */}
        <div className="relative">
          {/* Outer glow */}
          <div className={`absolute inset-0 rounded-[31px] blur-xl ${scanning ? 'bg-[#34D399]/40' : 'bg-[#2563EB]/40'} animate-pulse`}></div>

          {/* Main rectangle */}
          <div className={`relative w-72 h-80 rounded-[32px] border-4 ${scanning ? 'border-[#34D399]' : 'border-[#2563EB]'} flex items-center justify-center transition-all shadow-[0_0_60px_rgba(37,99,235,0.4)]`}>
            <div className="w-64 h-72 rounded-[32px] bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
              {scanning ? (
                <div className="text-center px-6">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-[#34D399] border-t-transparent animate-spin"></div>
                  <p className="text-white text-lg">Scanning {progress}%</p>
                  <p className="text-white/60 text-sm mt-2">Processing document</p>
                  <div className="mt-4 w-48 mx-auto">
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#34D399] rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <FileText className="w-16 h-16 text-white/30 mb-4 mx-auto" />
                  <p className="text-white/50 text-sm">Hold steady</p>
                </div>
              )}
            </div>
          </div>

          {/* Decorative corner guides */}
          <div className="absolute -top-3 -left-3 w-16 h-16 border-l-4 border-t-4 border-white/30 rounded-tl-[32px]"></div>
          <div className="absolute -top-3 -right-3 w-16 h-16 border-r-4 border-t-4 border-white/30 rounded-tr-[32px]"></div>
          <div className="absolute -bottom-3 -left-3 w-16 h-16 border-l-4 border-b-4 border-white/30 rounded-bl-[32px]"></div>
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-4 border-b-4 border-white/30 rounded-br-[32px]"></div>
        </div>

        {/* Instructions Overlay */}
        <div className="absolute top-12 left-0 right-0 text-center">
          <div className="inline-block bg-black/40 backdrop-blur-xl text-white px-6 py-3 rounded-full border border-white/10">
            <p className="text-sm">Ensure all text is visible • Keep still</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 space-y-6">
        {/* Capture Controls */}
        <div className="flex items-center justify-center gap-12">
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full text-white hover:bg-white/10 transition-all"
            onClick={() => setFlash(!flash)}
          >
            <Zap className={`w-6 h-6 transition-all ${flash ? "fill-[#F59E0B] text-[#F59E0B]" : ""}`} />
          </Button>

          <Button
            size="icon"
            className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.3)] border-4 border-[#2563EB] transition-all hover:scale-110"
            onClick={handleCapture}
            disabled={scanning}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#34D399]"></div>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full text-white hover:bg-white/10 transition-all"
          >
            <Image className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
