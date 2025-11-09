import { Button } from "./ui/button";
import { Camera, Video, Zap, Image, Info } from "lucide-react";
import { useState } from "react";

interface ScanCameraScreenProps {
  scanType?: string;
  scanTitle?: string;
  onNavigate: (screen: string, params?: any) => void;
}

export function ScanCameraScreen({ scanType = "eye", scanTitle = "Eye Check", onNavigate }: ScanCameraScreenProps) {
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [flash, setFlash] = useState(false);

  const handleCapture = () => {
    // Simulate capture and navigate to results
    setTimeout(() => {
      onNavigate("scan-results", { type: scanType, title: scanTitle });
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-[#1A202C]">
      {/* Header */}
      <div className="p-4 bg-[#2B6CB0] text-white">
        <h3 className="text-center">Position your dog's {scanType} in the frame</h3>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-[#2B6CB0]/20 to-[#1A202C]">
        {/* Circular Frame */}
        <div className="relative">
          <div className="w-72 h-72 rounded-full border-4 border-[#63B3ED] border-dashed flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
              <Camera className="w-16 h-16 text-white/50" />
            </div>
          </div>
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#63B3ED] rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#63B3ED] rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#63B3ED] rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#63B3ED] rounded-br-lg"></div>
        </div>

        {/* Instructions */}
        <div className="absolute top-8 left-0 right-0 text-center">
          <div className="inline-block bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
            <p className="text-sm">Hold steady and ensure good lighting</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 bg-[#1A202C] space-y-4">
        {/* Mode Toggle */}
        <div className="flex justify-center gap-2">
          <Button
            variant={mode === "photo" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("photo")}
            className={mode === "photo" ? "bg-[#2B6CB0]" : "text-white hover:bg-white/10"}
          >
            <Camera className="w-4 h-4 mr-2" />
            Photo
          </Button>
          <Button
            variant={mode === "video" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("video")}
            className={mode === "video" ? "bg-[#2B6CB0]" : "text-white hover:bg-white/10"}
          >
            <Video className="w-4 h-4 mr-2" />
            Video
          </Button>
        </div>

        {/* Capture Controls */}
        <div className="flex items-center justify-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full text-white hover:bg-white/10"
            onClick={() => setFlash(!flash)}
          >
            <Zap className={`w-6 h-6 ${flash ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>

          <Button
            size="icon"
            className="w-20 h-20 rounded-full bg-[#2B6CB0] hover:bg-[#2C5282] shadow-lg border-4 border-white"
            onClick={handleCapture}
          >
            <div className="w-16 h-16 rounded-full bg-white"></div>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full text-white hover:bg-white/10"
          >
            <Image className="w-6 h-6" />
          </Button>
        </div>

        {/* User Guide Link */}
        <div className="text-center">
          <button className="text-[#63B3ED] text-sm flex items-center justify-center gap-1 mx-auto hover:underline">
            <Info className="w-4 h-4" />
            User Guide
          </button>
        </div>
      </div>
    </div>
  );
}
