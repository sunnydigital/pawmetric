import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Scan, Camera, Check, Apple, Bone, ChevronLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDarkMode } from "./dark-mode-context";

interface LogMealScreenProps {
  onNavigate: (screen: string) => void;
}

export function LogMealScreen({ onNavigate }: LogMealScreenProps) {
  const { isDarkMode } = useDarkMode();
  const [scanMode, setScanMode] = useState<"barcode" | "ai" | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [portion, setPortion] = useState("");
  const [saved, setSaved] = useState(false);

  const handleBarcodeScanner = () => {
    setScanMode("barcode");
    setScanning(true);
    
    // Simulate barcode scan
    setTimeout(() => {
      setScanning(false);
      setScannedData({
        type: "dog-food",
        brand: "Blue Buffalo Life Protection",
        product: "Adult Chicken & Brown Rice",
        servingSize: "1 cup (92g)",
        caloriesPerServing: 380,
        protein: "26%",
        fat: "15%",
        fiber: "6%"
      });
      setScanMode(null);
    }, 2000);
  };

  const handleAIScanner = () => {
    onNavigate("meal-scanner-camera");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onNavigate("home");
    }, 800);
  };

  const calculateTotalCalories = () => {
    if (!scannedData || !portion) return 0;
    const portionNum = parseFloat(portion);
    return Math.round(scannedData.caloriesPerServing * portionNum);
  };

  return (
    <div className={`min-h-full pb-24 relative overflow-hidden`}>
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${isDarkMode ? 'gradient-bg-light' : 'gradient-bg'} transition-colors duration-500`}></div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("home")}
            className={`w-10 h-10 rounded-[12px] ${
              isDarkMode 
                ? 'bg-gray-800/20 border border-gray-700/30' 
                : 'bg-white/20 border border-white/30'
            } backdrop-blur-xl flex items-center justify-center transition-all`}
          >
            <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-800' : 'text-white'}`} />
          </motion.button>
          <div className="flex-1">
            <h1 
              className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold tracking-tight transition-colors`}
              style={{ fontSize: '28px', lineHeight: '36px' }}
            >
              Log Meal
            </h1>
            <p className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} font-medium transition-colors`} style={{ fontSize: '16px', lineHeight: '24px' }}>
              Track Cocoa's nutrition
            </p>
          </div>
        </div>

        {/* Scanner Options */}
        {!scannedData && (
          <motion.div 
            className="space-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Barcode Scanner for Dog Food */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBarcodeScanner}
                className={`h-40 ${isDarkMode ? 'glass-card-dark border-gray-700/20' : 'glass-card border-white/20'} border rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all`}
              >
                <div className={`w-16 h-16 rounded-[16px] ${isDarkMode ? 'bg-gradient-to-br from-gray-800/30 to-gray-800/10 border-gray-700/30' : 'bg-gradient-to-br from-white/30 to-white/10 border-white/30'} flex items-center justify-center border`}>
                  <Scan className={`w-8 h-8 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                </div>
                <div className="text-center px-2">
                  <div className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold text-sm mb-1 transition-colors`}>Scan Barcode</div>
                  <div className={`${isDarkMode ? 'text-gray-700/60' : 'text-white/60'} text-xs font-medium transition-colors`}>Dog food package</div>
                </div>
              </motion.button>

              {/* AI Scanner for Human Food */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAIScanner}
                className={`h-40 ${isDarkMode ? 'glass-card-dark border-gray-700/20' : 'glass-card border-white/20'} border rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all`}
              >
                <div className={`w-16 h-16 rounded-[16px] ${isDarkMode ? 'bg-gradient-to-br from-gray-800/30 to-gray-800/10 border-gray-700/30' : 'bg-gradient-to-br from-white/30 to-white/10 border-white/30'} flex items-center justify-center border`}>
                  <Sparkles className={`w-8 h-8 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                </div>
                <div className="text-center px-2">
                  <div className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold text-sm mb-1 transition-colors`}>AI Scanner</div>
                  <div className={`${isDarkMode ? 'text-gray-700/60' : 'text-white/60'} text-xs font-medium transition-colors`}>Human food & treats</div>
                </div>
              </motion.button>
            </div>

            <div 
              className={`p-4 rounded-[20px] ${isDarkMode ? 'bg-gray-800/10' : 'bg-white/10'} backdrop-blur-xl border ${isDarkMode ? 'border-gray-700/20' : 'border-white/20'} transition-all`}
            >
              <p className={`${isDarkMode ? 'text-gray-700/80' : 'text-white/80'} text-xs leading-relaxed font-medium transition-colors`}>
                💡 <strong>Tip:</strong> Use barcode scanner for packaged dog food or AI scanner to analyze human food portions and ingredients.
              </p>
            </div>
          </motion.div>
        )}

        {/* Barcode Scanning Animation */}
        <AnimatePresence>
          {scanMode === "barcode" && scanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8"
            >
              <Card 
                className="p-8 border-2 rounded-[24px]"
                style={{
                  background: isDarkMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
                  borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[#34D399] border-t-transparent"
                  ></motion.div>
                  <p className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold mb-2 transition-colors`} style={{ fontSize: '20px', lineHeight: '28px' }}>
                    Scanning Barcode...
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-sm font-medium transition-colors`}>
                    Reading product information
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scanned Data Display */}
        {scannedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Product Info Card */}
            <Card 
              className="p-6 border-2 rounded-[24px]"
              style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-[12px] ${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-blue-500' : 'bg-gradient-to-br from-[#3A83F1] to-[#63C4B5]'} flex items-center justify-center`}>
                  <Bone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold mb-1 transition-colors`} style={{ fontSize: '18px', lineHeight: '26px' }}>
                    {scannedData.brand}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-700/80' : 'text-white/80'} text-sm font-medium transition-colors`}>
                    {scannedData.product}
                  </p>
                </div>
              </div>

              {/* Nutrition Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-[16px] ${isDarkMode ? 'bg-gray-800/20' : 'bg-white/10'} transition-all`}>
                  <div className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-xs mb-1 font-medium transition-colors`}>Serving Size</div>
                  <div className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`}>{scannedData.servingSize}</div>
                </div>
                <div className={`p-3 rounded-[16px] ${isDarkMode ? 'bg-gray-800/20' : 'bg-white/10'} transition-all`}>
                  <div className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-xs mb-1 font-medium transition-colors`}>Calories/Serving</div>
                  <div className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`}>{scannedData.caloriesPerServing} kcal</div>
                </div>
                <div className={`p-3 rounded-[16px] ${isDarkMode ? 'bg-gray-800/20' : 'bg-white/10'} transition-all`}>
                  <div className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-xs mb-1 font-medium transition-colors`}>Protein</div>
                  <div className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`}>{scannedData.protein}</div>
                </div>
                <div className={`p-3 rounded-[16px] ${isDarkMode ? 'bg-gray-800/20' : 'bg-white/10'} transition-all`}>
                  <div className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-xs mb-1 font-medium transition-colors`}>Fat</div>
                  <div className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`}>{scannedData.fat}</div>
                </div>
              </div>
            </Card>

            {/* Portion Input */}
            <Card 
              className="p-6 border-2 rounded-[24px]"
              style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <Label className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-3 block font-bold transition-colors`}>
                How much did you feed Cocoa?
              </Label>
              
              <div className="grid grid-cols-4 gap-2 mb-4">
                {["0.5", "1", "1.5", "2"].map((value) => (
                  <motion.button
                    key={value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPortion(value)}
                    className={`h-12 rounded-[12px] font-bold text-sm transition-all ${
                      portion === value
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white'
                          : 'bg-white/30 text-white border-2 border-white/50'
                        : isDarkMode
                        ? 'bg-gray-800/20 text-gray-700 border border-gray-700/30'
                        : 'bg-white/10 text-white/70 border border-white/20'
                    }`}
                  >
                    {value} cup{value !== "1" && "s"}
                  </motion.button>
                ))}
              </div>

              <div className="relative">
                <Input
                  type="number"
                  step="0.25"
                  placeholder="Or enter custom amount"
                  value={portion}
                  onChange={(e) => setPortion(e.target.value)}
                  className={`h-12 rounded-[12px] ${
                    isDarkMode 
                      ? 'bg-gray-800/20 border-gray-700/30 text-gray-900 placeholder:text-gray-600'
                      : 'bg-white/10 border-white/20 text-white placeholder:text-white/50'
                  } font-medium transition-all`}
                  style={{ fontSize: '16px' }}
                />
                <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} font-medium`}>
                  cups
                </span>
              </div>

              {/* Total Calories */}
              {portion && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4"
                >
                  <div className={`p-4 rounded-[16px] ${isDarkMode ? 'bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-700/30' : 'bg-gradient-to-r from-[#3A83F1]/20 to-[#63C4B5]/20 border border-white/30'} transition-all`}>
                    <div className="flex items-center justify-between">
                      <span className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`}>Total Calories</span>
                      <span className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`} style={{ fontSize: '24px' }}>
                        {calculateTotalCalories()} kcal
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={!portion || saved}
                className={`w-full h-14 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white' 
                    : 'button-gradient text-white'
                } rounded-[100px] flex items-center justify-center gap-3 font-bold transition-all disabled:opacity-50`}
                style={{ fontSize: '16px' }}
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Log Meal</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setScannedData(null)}
                className={`w-full h-12 rounded-[100px] ${
                  isDarkMode 
                    ? 'bg-gray-800/20 border border-gray-700/30 text-gray-900'
                    : 'bg-white/10 border border-white/20 text-white'
                } font-medium transition-all`}
              >
                Scan Different Product
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
