import { Button } from "./ui/button";
import { Camera, Video, Zap, Image, HelpCircle } from "lucide-react";
import { useState } from "react";

interface ScanCameraFinalProps {
  scanType?: string;
  scanTitle?: string;
  onNavigate: (screen: string, params?: any) => void;
}

export function ScanCameraFinal({ scanType = "eye", scanTitle = "Eye Check", onNavigate }: ScanCameraFinalProps) {
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [flash, setFlash] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleCapture = () => {
    setScanning(true);
    setTimeout(() => {
      onNavigate("scan-results", { type: scanType, title: scanTitle });
    }, 1800);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#111827] to-[#1F2937]">
      {/* Header */}
      <div className="p-6 text-white text-center">
        <h3 className="mb-2">{scanTitle}</h3>
        <p className="text-white/70 text-sm">Position your dog's {scanType} in the frame</p>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center px-6">
        {/* Circular Scan Viewport */}
        <div className="relative">
          <div className={`w-80 h-80 rounded-full border-4 ${scanning ? 'border-[#34D399] animate-pulse' : 'border-[#2563EB]'} flex items-center justify-center transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)]`}>
            <div className="w-72 h-72 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border-2 border-white/10">
              <Camera className="w-20 h-20 text-white/30" />
            </div>
          </div>
          
          {/* Corner Guides */}
          <div className="absolute -top-2 -left-2 w-12 h-12 border-l-4 border-t-4 border-[#2563EB] rounded-tl-3xl"></div>
          <div className="absolute -top-2 -right-2 w-12 h-12 border-r-4 border-t-4 border-[#2563EB] rounded-tr-3xl"></div>
          <div className="absolute -bottom-2 -left-2 w-12 h-12 border-l-4 border-b-4 border-[#2563EB] rounded-bl-3xl"></div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r-4 border-b-4 border-[#2563EB] rounded-br-3xl"></div>

          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#34D399] border-t-transparent animate-spin"></div>
                <p className="text-white">Analyzing...</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions Overlay */}
        <div className="absolute top-8 left-0 right-0 text-center">
          <div className="inline-block bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/10">
            <p className="text-sm">Hold steady • Ensure good lighting</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 space-y-6">
        {/* Mode Toggle */}
        <div className="flex justify-center gap-3">
          <Button
            variant={mode === "photo" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("photo")}
            className={`${mode === "photo" ? "bg-[#2563EB] hover:bg-[#1D4ED8]" : "text-white hover:bg-white/10"} rounded-full px-6 transition-all`}
          >
            <Camera className="w-4 h-4 mr-2" />
            Photo
          </Button>
          <Button
            variant={mode === "video" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("video")}
            className={`${mode === "video" ? "bg-[#2563EB] hover:bg-[#1D4ED8]" : "text-white hover:bg-white/10"} rounded-full px-6 transition-all`}
          >
            <Video className="w-4 h-4 mr-2" />
            Video
          </Button>
        </div>

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

        {/* Help Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            User Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
