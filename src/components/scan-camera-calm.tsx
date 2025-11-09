import { Button } from "./ui/button";
import { Camera, Video, Zap, Image, HelpCircle } from "lucide-react";
import { useState } from "react";

interface ScanCameraCalmProps {
  scanType?: string;
  scanTitle?: string;
  onNavigate: (screen: string, params?: any) => void;
}

export function ScanCameraCalm({ scanType = "eye", scanTitle = "Eye Check", onNavigate }: ScanCameraCalmProps) {
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [flash, setFlash] = useState(false);
  const [scanning, setScanning] = useState(false);

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
          onNavigate("scan-results", { type: scanType, title: scanTitle });
        }, 300);
      }
    }, 100);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#1F2937] via-[#111827] to-[#0F172A]">
      {/* Header */}
      <div className="p-8 text-center">
        <h3 className="text-white mb-2">{scanTitle}</h3>
        <p className="text-white/60 text-sm">Position your dog's {scanType} in the frame</p>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center px-6">
        {/* Soft Circular Frame Overlay */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className={`absolute inset-0 rounded-full blur-xl ${scanning ? 'bg-[#34D399]/40' : 'bg-[#2563EB]/40'} animate-pulse`}></div>
          
          {/* Main circle */}
          <div className={`relative w-80 h-80 rounded-full border-4 ${scanning ? 'border-[#34D399]' : 'border-[#2563EB]'} flex items-center justify-center transition-all shadow-[0_0_60px_rgba(37,99,235,0.4)]`}>
            <div className="w-72 h-72 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
              {scanning ? (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-[#34D399] border-t-transparent animate-spin"></div>
                  <p className="text-white text-lg">Analyzing {progress}%</p>
                  <p className="text-white/60 text-sm mt-2">Detecting health indicators</p>
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
                  <Camera className="w-16 h-16 text-white/30 mb-4 mx-auto" />
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
            <p className="text-sm">Ensure good lighting • Keep still</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 space-y-6">
        {/* Mode Toggle */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setMode("photo")}
            className={`px-6 py-3 rounded-full transition-all ${
              mode === "photo"
                ? "bg-white/20 text-white border border-white/30 backdrop-blur-xl"
                : "bg-transparent text-white/60 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span className="text-sm">Photo</span>
            </div>
          </button>
          <button
            onClick={() => setMode("video")}
            className={`px-6 py-3 rounded-full transition-all ${
              mode === "video"
                ? "bg-white/20 text-white border border-white/30 backdrop-blur-xl"
                : "bg-transparent text-white/60 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="text-sm">Video</span>
            </div>
          </button>
        </div>

        {/* Capture Button */}
        <div className="flex items-center justify-center gap-12">
          <button
            onClick={() => setFlash(!flash)}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/15 transition-all"
          >
            <Zap className={`w-5 h-5 transition-all ${flash ? "fill-yellow-400 text-yellow-400" : "text-white/70"}`} />
          </button>

          <button
            onClick={handleCapture}
            disabled={scanning}
            className="w-20 h-20 rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#34D399]"></div>
          </button>

          <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/15 transition-all">
            <Image className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Help */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-all text-sm">
            <HelpCircle className="w-4 h-4" />
            <span>How to get the best scan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
