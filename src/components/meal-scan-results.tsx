import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CheckCircle, Package, Weight, AlertCircle, Save, RotateCcw, Apple } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useDarkMode } from "./dark-mode-context";

interface MealScanResultsProps {
  onNavigate: (screen: string) => void;
}

export function MealScanResults({ onNavigate }: MealScanResultsProps) {
  const { isDarkMode } = useDarkMode();
  const [portion, setPortion] = useState("1.5");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onNavigate("home");
    }, 800);
  };

  const calculateCalories = () => {
    return Math.round(253 * parseFloat(portion));
  };

  return (
    <div className={`min-h-full pb-24 relative overflow-hidden`}>
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${isDarkMode ? 'gradient-bg-light' : 'gradient-bg'} transition-colors duration-500`}></div>

      {/* Content */}
      <div className="relative z-10 px-6">
        {/* Header */}
        <div className="pt-12 pb-8 text-center">
          <motion.div 
            className={`w-20 h-20 mx-auto mb-4 rounded-full ${
              isDarkMode 
                ? 'bg-gray-800/20 border-2 border-gray-700/30' 
                : 'bg-white/20 border-2 border-white/30'
            } backdrop-blur-sm flex items-center justify-center`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className={`w-10 h-10 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
          </motion.div>
          <motion.h2 
            className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-2 font-bold transition-colors`}
            style={{ fontSize: '28px', lineHeight: '36px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Human Food Detected!
          </motion.h2>
          <motion.p 
            className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-sm font-medium transition-colors`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            AI analyzed • {new Date().toLocaleDateString()}
          </motion.p>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Food Item Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card 
              className="p-6 border-2 rounded-[24px]"
              style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
                borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-[16px] ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-orange-600 to-orange-500' 
                    : 'bg-gradient-to-br from-orange-400 to-orange-500'
                } flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-1 font-bold transition-colors`} style={{ fontSize: '20px', lineHeight: '28px' }}>
                        Chicken Breast
                      </h3>
                      <p className={`${isDarkMode ? 'text-gray-700/80' : 'text-white/80'} text-sm font-medium transition-colors`}>
                        Cooked, boneless, skinless
                      </p>
                      <p className={`${isDarkMode ? 'text-gray-700/60' : 'text-white/60'} text-xs mt-1 font-medium transition-colors`}>
                        Safe for dogs ✓
                      </p>
                    </div>
                    <div className={`px-3 py-1 ${
                      isDarkMode 
                        ? 'bg-gray-800/30 border border-gray-700/40' 
                        : 'bg-white/20 border border-white/30'
                    } backdrop-blur-sm rounded-full transition-all`}>
                      <span className={`${isDarkMode ? 'text-gray-900' : 'text-white'} text-xs font-bold transition-colors`}>
                        95% match
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Portion Size */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card 
              className="p-5 border-2 rounded-[24px]"
              style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
                borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-800/30 border border-gray-700/40' 
                    : 'bg-white/20 border border-white/30'
                } backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-all`}>
                  <Weight className={`w-6 h-6 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-1 font-bold transition-colors`}>
                    Estimated Portion
                  </h4>
                  <p className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-sm font-medium transition-colors`}>
                    Based on plate size and food volume
                  </p>
                </div>
              </div>
              
              {/* Portion Display */}
              <div className={`grid grid-cols-3 gap-4 p-4 ${
                isDarkMode ? 'bg-gray-800/20' : 'bg-white/10'
              } rounded-[20px] border ${
                isDarkMode ? 'border-gray-700/20' : 'border-white/10'
              } mb-4 transition-all`}>
                <div className="text-center">
                  <div className={`text-3xl ${isDarkMode ? 'text-gray-900' : 'text-white'} mb-1 font-bold transition-colors`}>
                    {portion}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} font-medium transition-colors`}>
                    cups
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl ${isDarkMode ? 'text-gray-900' : 'text-white'} mb-1 font-bold transition-colors`}>
                    {Math.round(parseFloat(portion) * 140)}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} font-medium transition-colors`}>
                    grams
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl ${isDarkMode ? 'text-gray-900' : 'text-white'} mb-1 font-bold transition-colors`}>
                    {calculateCalories()}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} font-medium transition-colors`}>
                    kcal
                  </div>
                </div>
              </div>

              {/* Adjust Portion */}
              <div>
                <label className={`${isDarkMode ? 'text-gray-900' : 'text-white'} text-sm font-bold mb-2 block transition-colors`}>
                  Adjust portion (cups)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {["0.5", "1", "1.5", "2", "2.5"].map((value) => (
                    <motion.button
                      key={value}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPortion(value)}
                      className={`h-10 rounded-[12px] font-bold text-sm transition-all ${
                        portion === value
                          ? isDarkMode
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white'
                            : 'bg-white/30 text-white border-2 border-white/50'
                          : isDarkMode
                          ? 'bg-gray-800/20 text-gray-700 border border-gray-700/30'
                          : 'bg-white/10 text-white/70 border border-white/20'
                      }`}
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Nutritional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card 
              className="p-5 border-2 rounded-[24px]"
              style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
                borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <h4 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-4 font-bold transition-colors`}>
                Nutritional Breakdown
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Protein", value: Math.round(31 * parseFloat(portion)), target: 40, color: isDarkMode ? "bg-blue-600" : "bg-blue-400" },
                  { label: "Fat", value: Math.round(4 * parseFloat(portion)), target: 10, color: isDarkMode ? "bg-green-600" : "bg-green-400" },
                  { label: "Carbs", value: 0, target: 5, color: isDarkMode ? "bg-yellow-600" : "bg-yellow-400" },
                ].map((nutrient) => (
                  <div key={nutrient.label}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className={`${isDarkMode ? 'text-gray-900' : 'text-white/90'} font-medium transition-colors`}>
                        {nutrient.label}
                      </span>
                      <span className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} font-medium transition-colors`}>
                        {nutrient.value}g / {nutrient.target}g
                      </span>
                    </div>
                    <div className={`h-2 ${isDarkMode ? 'bg-gray-800/20' : 'bg-white/20'} rounded-full overflow-hidden transition-all`}>
                      <div
                        className={`h-full ${nutrient.color} rounded-full transition-all`}
                        style={{ width: `${Math.min((nutrient.value / nutrient.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Safety Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card 
              className="p-5 border-2 rounded-[24px]"
              style={{
                background: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(52, 211, 153, 0.2)',
                borderColor: isDarkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(52, 211, 153, 0.3)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${
                  isDarkMode ? 'bg-green-600/30' : 'bg-white/30'
                } flex items-center justify-center flex-shrink-0 transition-all`}>
                  <span className="text-xl">✓</span>
                </div>
                <div className="flex-1">
                  <h4 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-2 font-bold transition-colors`}>
                    Safe & Healthy
                  </h4>
                  <p className={`${isDarkMode ? 'text-gray-700/80' : 'text-white/80'} text-sm leading-relaxed font-medium transition-colors`}>
                    Plain chicken breast is an excellent protein source for Cocoa. This portion provides good nutrition without excess calories.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="space-y-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saved}
              className={`w-full h-14 ${
                isDarkMode 
                  ? 'bg-white text-[#2563EB]' 
                  : 'bg-white text-[#2563EB]'
              } rounded-[24px] flex items-center justify-center gap-2 font-bold shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition-all disabled:opacity-50`}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save to Meal Log</span>
                </>
              )}
            </motion.button>

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("meal-scanner-camera")}
                className={`h-12 ${
                  isDarkMode 
                    ? 'bg-gray-800/20 border border-gray-700/30 text-gray-900' 
                    : 'bg-white/15 border border-white/20 text-white'
                } backdrop-blur-xl rounded-[24px] flex items-center justify-center gap-2 hover:bg-white/20 transition-all`}
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Re-scan</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("home")}
                className={`h-12 ${
                  isDarkMode 
                    ? 'bg-gray-800/20 border border-gray-700/30 text-gray-900' 
                    : 'bg-white/15 border border-white/20 text-white'
                } backdrop-blur-xl rounded-[24px] flex items-center justify-center gap-2 hover:bg-white/20 transition-all`}
              >
                <span className="text-sm font-medium">Done</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
