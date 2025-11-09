import { Button } from "./ui/button";
import { Camera, Zap, Image, HelpCircle, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useDarkMode } from "./dark-mode-context";

interface MealScannerCameraProps {
  onNavigate: (screen: string, params?: any) => void;
}

export function MealScannerCamera({ onNavigate }: MealScannerCameraProps) {
  const { isDarkMode } = useDarkMode();
  const [flash, setFlash] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleCapture = () => {
    setScanning(true);
    setTimeout(() => {
      onNavigate("meal-scan-results");
    }, 2000);
  };

  return (
    <div className={`h-full flex flex-col ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300' 
        : 'bg-gradient-to-b from-[#1F2937] via-[#111827] to-[#0F172A]'
    } transition-colors duration-500`}>
      {/* Header */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("log-meal")}
            className={`w-10 h-10 rounded-[12px] ${
              isDarkMode 
                ? 'bg-gray-800/20 border border-gray-700/30' 
                : 'bg-white/20 border border-white/30'
            } backdrop-blur-xl flex items-center justify-center transition-all`}
          >
            <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-800' : 'text-white'}`} />
          </motion.button>
          <div className="text-center flex-1">
            <h3 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-2 font-bold transition-colors`} style={{ fontSize: '24px', lineHeight: '32px' }}>
              AI Meal Scanner
            </h3>
            <p className={`${isDarkMode ? 'text-gray-700/60' : 'text-white/60'} text-sm font-medium transition-colors`}>
              Scan food to identify ingredients & calories
            </p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center px-6">
        {/* Rectangular Frame Overlay for food */}
        <div className="relative">
          {/* Outer glow */}
          <div className={`absolute inset-0 rounded-[32px] blur-xl ${
            scanning 
              ? isDarkMode ? 'bg-green-600/40' : 'bg-[#34D399]/40'
              : isDarkMode ? 'bg-blue-600/40' : 'bg-[#2563EB]/40'
          } animate-pulse transition-colors`}></div>
          
          {/* Main frame */}
          <div className={`relative w-80 h-64 rounded-[32px] border-4 ${
            scanning 
              ? isDarkMode ? 'border-green-600' : 'border-[#34D399]'
              : isDarkMode ? 'border-blue-600' : 'border-[#2563EB]'
          } flex items-center justify-center transition-all ${
            isDarkMode 
              ? 'shadow-[0_0_60px_rgba(37,99,235,0.3)]' 
              : 'shadow-[0_0_60px_rgba(37,99,235,0.4)]'
          }`}>
            <div className={`w-72 h-56 rounded-[24px] ${
              isDarkMode 
                ? 'bg-gray-900/5 border-gray-700/10' 
                : 'bg-white/5 border-white/10'
            } backdrop-blur-md flex items-center justify-center border transition-colors`}>
              {scanning ? (
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full border-4 ${
                    isDarkMode 
                      ? 'border-green-600 border-t-transparent' 
                      : 'border-[#34D399] border-t-transparent'
                  } animate-spin transition-colors`}></div>
                  <p className={`${isDarkMode ? 'text-gray-900' : 'text-white'} text-lg font-bold transition-colors`}>
                    Analyzing meal...
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-700/60' : 'text-white/60'} text-sm mt-2 font-medium transition-colors`}>
                    Detecting ingredients & nutrition
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className={`w-16 h-16 ${isDarkMode ? 'text-gray-600/30' : 'text-white/30'} mb-4 mx-auto transition-colors`} />
                  <p className={`${isDarkMode ? 'text-gray-600/50' : 'text-white/50'} text-sm font-medium transition-colors`}>
                    Position food in frame
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Decorative corner guides */}
          <div className={`absolute -top-3 -left-3 w-16 h-16 border-l-4 border-t-4 ${
            isDarkMode ? 'border-gray-700/30' : 'border-white/30'
          } rounded-tl-[24px] transition-colors`}></div>
          <div className={`absolute -top-3 -right-3 w-16 h-16 border-r-4 border-t-4 ${
            isDarkMode ? 'border-gray-700/30' : 'border-white/30'
          } rounded-tr-[24px] transition-colors`}></div>
          <div className={`absolute -bottom-3 -left-3 w-16 h-16 border-l-4 border-b-4 ${
            isDarkMode ? 'border-gray-700/30' : 'border-white/30'
          } rounded-bl-[24px] transition-colors`}></div>
          <div className={`absolute -bottom-3 -right-3 w-16 h-16 border-r-4 border-b-4 ${
            isDarkMode ? 'border-gray-700/30' : 'border-white/30'
          } rounded-br-[24px] transition-colors`}></div>
        </div>

        {/* Instructions Overlay */}
        <div className="absolute top-12 left-0 right-0 text-center">
          <div className={`inline-block ${
            isDarkMode 
              ? 'bg-gray-800/40 border border-gray-700/30 text-gray-900' 
              : 'bg-black/40 border border-white/10 text-white'
          } backdrop-blur-xl px-6 py-3 rounded-full transition-all`}>
            <p className="text-sm font-medium">Clear view • Good lighting</p>
          </div>
        </div>

        {/* AI Detection Info */}
        <div className="absolute bottom-12 left-0 right-0 px-6">
          <div className={`${
            isDarkMode 
              ? 'bg-gray-800/40 border border-gray-700/30 text-gray-900' 
              : 'bg-black/40 border border-white/10 text-white'
          } backdrop-blur-xl p-4 rounded-[20px] transition-all`}>
            <p className={`text-xs text-center ${
              isDarkMode ? 'text-gray-700/70' : 'text-white/70'
            } leading-relaxed font-medium transition-colors`}>
              AI will detect food type, ingredients, and estimate calories
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 space-y-6">
        {/* Capture Button */}
        <div className="flex items-center justify-center gap-12">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFlash(!flash)}
            className={`w-12 h-12 rounded-full ${
              isDarkMode 
                ? 'bg-gray-800/20 border border-gray-700/30' 
                : 'bg-white/10 border border-white/20'
            } backdrop-blur-xl flex items-center justify-center hover:bg-white/15 transition-all`}
          >
            <Zap className={`w-5 h-5 transition-all ${
              flash 
                ? "fill-yellow-400 text-yellow-400" 
                : isDarkMode ? "text-gray-700/70" : "text-white/70"
            }`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCapture}
            disabled={scanning}
            className="w-20 h-20 rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all disabled:opacity-50"
          >
            <div className={`w-16 h-16 rounded-full ${
              isDarkMode 
                ? 'bg-gradient-to-br from-[#2563EB] to-[#10B981]' 
                : 'bg-gradient-to-br from-[#2563EB] to-[#34D399]'
            } transition-colors`}></div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full ${
              isDarkMode 
                ? 'bg-gray-800/20 border border-gray-700/30' 
                : 'bg-white/10 border border-white/20'
            } backdrop-blur-xl flex items-center justify-center hover:bg-white/15 transition-all`}
          >
            <Image className={`w-5 h-5 ${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} transition-colors`} />
          </motion.button>
        </div>

        {/* Help */}
        <div className="flex justify-center">
          <button className={`flex items-center gap-2 ${
            isDarkMode ? 'text-gray-700/60 hover:text-gray-900' : 'text-white/60 hover:text-white'
          } transition-all text-sm font-medium`}>
            <HelpCircle className="w-4 h-4" />
            <span>Tips for best results</span>
          </button>
        </div>
      </div>
    </div>
  );
}
