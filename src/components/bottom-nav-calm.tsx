import { Home, Scan, FileText, User, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useDarkMode } from "./dark-mode-context";

interface BottomNavCalmProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "vet", icon: Stethoscope, label: "Vet" },
  { id: "scans", icon: Scan, label: "Scans", hasNotification: true },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNavCalm({ activeTab, onTabChange }: BottomNavCalmProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="relative z-50">
      {/* Subtle Glass Background with 10px blur, 80% opacity */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: isDarkMode ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          opacity: 0.8,
        }}
      ></div>
      
      {/* Top Border with Gradient */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-gray-700/30 to-transparent' : 'bg-gradient-to-r from-transparent via-white/30 to-transparent'}`}></div>
      
      {/* Soft Shadow */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
      
      <div className="relative px-6 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center gap-1.5 py-2 px-3 transition-all relative"
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Background Glass Tile */}
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 rounded-[12px]"
                    style={{
                      background: isDarkMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  ></motion.div>
                )}
                
                {/* Icon with fill animation */}
                <div className="relative">
                  <motion.div
                    className={`transition-all ${
                      isActive 
                        ? isDarkMode ? "text-gray-900" : "text-white"
                        : isDarkMode ? "text-gray-700/60" : "text-white/60"
                    }`}
                    animate={isActive ? { 
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      strokeWidth={isActive ? 2.5 : 2}
                      fill={isActive ? "currentColor" : "none"}
                      style={{ 
                        fillOpacity: isActive ? 0.2 : 0,
                        transition: 'fill-opacity 0.3s ease'
                      }}
                    />
                  </motion.div>
                  
                  {/* Pulse indicator for new scans */}
                  {item.hasNotification && item.id !== activeTab && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-br from-[#3A83F1] to-[#63C4B5]"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
                
                <span 
                  className={`text-xs transition-all relative font-medium ${isActive ? "text-white" : "text-white/60"}`}
                  style={{ fontSize: '11px' }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
