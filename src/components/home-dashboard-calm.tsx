import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Utensils, Footprints, Scan, Sparkles, Award, MapPin, Phone, CheckCircle, Circle, TrendingUp, Activity, Calendar, Clock, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AchievementsModal } from "./achievements-modal";
import { PetScopeLogo } from "./petscope-logo";
import { useDarkMode } from "./dark-mode-context";

interface HomeDashboardCalmProps {
  onNavigate: (screen: string) => void;
}

const recentActivity = [
  { type: "meal", time: "2h ago", description: "Morning meal logged" },
  { type: "walk", time: "5h ago", description: "Walk — 1.2 mi" },
  { type: "scan", time: "Yesterday", description: "Eye scan completed" },
];

const dailyGoals = [
  { id: "feed", label: "Feed", completed: 2, target: 2, icon: Utensils },
  { id: "walk", label: "Walk", completed: 1, target: 1, icon: Footprints },
  { id: "scan", label: "Scan", completed: 0, target: 1, icon: Scan },
];

const milestones = [
  { id: 1, title: "Dental Improvement", subtitle: "15% better than last month", value: "+15%", icon: TrendingUp },
  { id: 2, title: "Activity Streak", subtitle: "14 consecutive days", value: "14d", icon: Activity },
];

const nearbyVets = [
  { name: "Pawfect Care Veterinary", distance: "0.8 mi", rating: 4.9, phone: "(555) 123-4567" },
  { name: "Happy Tails Animal Hospital", distance: "1.2 mi", rating: 4.8, phone: "(555) 234-5678" },
];

export function HomeDashboardCalm({ onNavigate }: HomeDashboardCalmProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showAchievements, setShowAchievements] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const [hasNewScan, setHasNewScan] = useState(false);
  const currentStreak = 14;
  
  // Animate health score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHealthScore(87);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate wellness ring progress based on daily goals
  const totalCompleted = dailyGoals.reduce((acc, goal) => acc + goal.completed, 0);
  const totalTargets = dailyGoals.reduce((acc, goal) => acc + goal.target, 0);
  const wellnessProgress = (totalCompleted / totalTargets) * 100;
  const circumference = 2 * Math.PI * 70;

  return (
    <div className="min-h-full pb-24 relative overflow-hidden">
      {/* Tri-tone Gradient Background */}
      <div className={`absolute inset-0 ${isDarkMode ? 'gradient-bg-light' : 'gradient-bg'} transition-colors duration-500`}></div>

      <div className="relative z-10">
        {/* Hero Section with Pet Card */}
        <div className="px-6 pt-20">
          {/* Welcome Text - on 4pt grid */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} mb-2 font-medium transition-colors`} style={{ fontSize: '16px', lineHeight: '24px' }}>
              Welcome back, Alex & Cocoa 🐶
            </p>
            <h1 
              className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold tracking-tight transition-colors`}
              style={{ fontSize: '28px', lineHeight: '36px' }}
            >
              Health Dashboard
            </h1>
          </motion.div>

          {/* Pet Profile Card - Living Glass Surface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            whileInView={{
              boxShadow: ['0 6px 12px rgba(0,0,0,0.12)', '0 8px 16px rgba(0,0,0,0.16)', '0 6px 12px rgba(0,0,0,0.12)']
            }}
            viewport={{ once: false, amount: 0.5 }}
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
            }}
          >
            <div
              className="p-6 transition-all duration-300"
              style={{
                background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '24px',
                overflow: 'hidden',
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                {/* Pet Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-[12px] bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-white/40 shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEwMjUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Cocoa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-1 font-bold transition-colors`} style={{ fontSize: '20px', lineHeight: '28px' }}>
                    Cocoa
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-700/80' : 'text-white/80'} text-sm font-medium transition-colors`}>Golden Retriever • 5 years</p>
                </div>
              </div>

              {/* Health Score Ring with Ambient Halo */}
              <div className="relative w-40 h-40 mx-auto mb-6">
                {/* Ambient Halo Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-[48px]"
                  style={{ 
                    background: 'rgba(99, 196, 181, 0.15)',
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.25, 0.15]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <svg className="w-full h-full transform -rotate-90 relative z-10">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#healthGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ 
                      strokeDashoffset: healthScore > 0 ? circumference - (healthScore / 100) * circumference : circumference
                    }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3A83F1" stopOpacity="1" />
                      <stop offset="100%" stopColor="#63C4B5" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div 
                    className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-1 font-bold transition-colors`}
                    style={{ fontSize: '48px', lineHeight: '56px' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                  >
                    {healthScore}
                  </motion.div>
                  <div className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-sm font-medium transition-colors`}>Health Score</div>
                </div>
              </div>

              {/* Contextual Insight */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-center px-4 relative"
              >
                <motion.p 
                  className={`${isDarkMode ? 'text-gray-700/80' : 'text-white/80'} text-sm font-medium leading-relaxed transition-colors`}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Cocoa's energy is trending higher this week 🐕✨
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* AI Health Check CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ marginTop: '32px' }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("health-check")}
              className={`w-full h-14 ${isDarkMode ? 'bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white' : 'button-gradient text-white'} rounded-[100px] flex items-center justify-center gap-3 font-medium transition-all`}
              style={{ fontSize: '16px', lineHeight: '24px' }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Start AI Health Check</span>
            </motion.button>
          </motion.div>

          {/* Quick Actions - Living Glass Tiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 gap-4"
            style={{ marginTop: '32px' }}
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("log-meal")}
              className={`h-32 ${isDarkMode ? 'glass-card-dark border-gray-700/20' : 'glass-card border-white/20'} border rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all`}
            >
              <div className={`w-14 h-14 rounded-[12px] ${isDarkMode ? 'bg-gradient-to-br from-gray-800/30 to-gray-800/10 border-gray-700/30' : 'bg-gradient-to-br from-white/30 to-white/10 border-white/30'} flex items-center justify-center border`}>
                <Utensils className={`w-6 h-6 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
              </div>
              <span className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-medium text-sm transition-colors`}>Log Meal</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("log-walk")}
              className={`h-32 ${isDarkMode ? 'glass-card-dark border-gray-700/20' : 'glass-card border-white/20'} border rounded-[24px] flex flex-col items-center justify-center gap-3 transition-all`}
            >
              <div className={`w-14 h-14 rounded-[12px] ${isDarkMode ? 'bg-gradient-to-br from-gray-800/30 to-gray-800/10 border-gray-700/30' : 'bg-gradient-to-br from-white/30 to-white/10 border-white/30'} flex items-center justify-center border`}>
                <Footprints className={`w-6 h-6 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
              </div>
              <span className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-medium text-sm transition-colors`}>Log Walk</span>
            </motion.button>
          </motion.div>

          {/* Health Milestones */}
          <div style={{ marginTop: '32px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`} style={{ fontSize: '20px', lineHeight: '28px' }}>
                Health Insights
              </h3>
            </div>

            <div className="space-y-3">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div 
                      className={`p-4 border-2 rounded-[24px] ${isDarkMode ? 'hover:bg-gray-800/15' : 'hover:bg-white/15'} transition-all`}
                      style={{
                        background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                        borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-[12px] ${isDarkMode ? 'bg-gradient-to-br from-gray-800/30 to-gray-800/10 border-gray-700/30' : 'bg-gradient-to-br from-white/30 to-white/10 border-white/30'} flex items-center justify-center border`}>
                          <Icon className={`w-5 h-5 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} text-sm font-bold leading-tight transition-colors`}>{milestone.title}</h4>
                            <span className={`${isDarkMode ? 'text-blue-600' : 'text-cyan-300'} flex-shrink-0 font-bold text-sm transition-colors`}>{milestone.value}</span>
                          </div>
                          <p className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-xs font-medium leading-relaxed transition-colors`}>{milestone.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Daily Goals */}
          <div style={{ marginTop: '32px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`} style={{ fontSize: '20px', lineHeight: '28px' }}>
                Daily Goals
              </h3>
              <span className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-sm font-medium transition-colors`}>{totalCompleted}/{totalTargets} completed</span>
            </div>

            <div className="space-y-3">
              {dailyGoals.map((goal, index) => {
                const Icon = goal.icon;
                const isCompleted = goal.completed >= goal.target;
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center border transition-all ${
                      isCompleted 
                        ? isDarkMode ? 'bg-gray-800/30 border-gray-700/50' : 'bg-white/30 border-white/50'
                        : isDarkMode ? 'bg-gray-800/10 border-gray-700/20' : 'bg-white/10 border-white/20'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                      ) : (
                        <Icon className={`w-5 h-5 ${isDarkMode ? 'text-gray-700/70' : 'text-white/70'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`${isDarkMode ? 'text-gray-900' : 'text-white'} text-sm font-bold transition-colors`}>{goal.label}</span>
                        <span className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} text-xs font-medium transition-colors`}>{goal.completed}/{goal.target}</span>
                      </div>
                      <div className={`h-1.5 ${isDarkMode ? 'bg-gray-800/10' : 'bg-white/10'} rounded-full overflow-hidden`}>
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#3A83F1] to-[#63C4B5] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(goal.completed / goal.target) * 100}%` }}
                          transition={{ duration: 0.8, delay: 1.2 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Nearby Vets */}
          <div style={{ marginTop: '32px', marginBottom: '32px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold transition-colors`} style={{ fontSize: '20px', lineHeight: '28px' }}>
                Nearby Vets
              </h3>
            </div>

            <div className="space-y-3">
              {nearbyVets.map((vet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full p-4 ${isDarkMode ? 'glass-card-dark border-gray-700/20' : 'glass-card border-white/20'} border rounded-[24px] transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onNavigate("vet-location")}
                      className={`w-10 h-10 rounded-[12px] ${isDarkMode ? 'bg-gray-800/20 hover:bg-gray-800/30' : 'bg-white/20 hover:bg-white/30'} flex items-center justify-center flex-shrink-0 transition-all`}
                    >
                      <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                    </button>
                    <button
                      onClick={() => onNavigate("vet-location")}
                      className="flex-1 min-w-0 text-left"
                    >
                      <h4 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} text-sm font-bold mb-1 transition-colors`}>{vet.name}</h4>
                      <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} font-medium transition-colors`}>
                        <span>{vet.distance}</span>
                        <span>⭐ {vet.rating}</span>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${vet.phone}`);
                      }}
                      className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-800/20 hover:bg-gray-800/30' : 'bg-white/20 hover:bg-white/30'} flex items-center justify-center flex-shrink-0 transition-all`}
                    >
                      <Phone className={`w-4 h-4 ${isDarkMode ? 'text-gray-900' : 'text-white'}`} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Modal */}
      <AchievementsModal 
        isOpen={showAchievements} 
        onClose={() => setShowAchievements(false)} 
      />
    </div>
  );
}
