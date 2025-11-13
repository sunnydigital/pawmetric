import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Utensils, Footprints, Scan, Sparkles, Award, MapPin, Phone, CheckCircle, Circle, TrendingUp, Activity as ActivityIcon, Calendar, Clock, Moon, Sun, Loader2, User } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { AchievementsModal } from "./achievements-modal";
import { PetScopeLogo } from "./petscope-logo";
import { useDarkMode } from "./dark-mode-context";
import { useAuth } from "../contexts/AuthContext";
import { usePets } from "../hooks/useApi";
import { useHealthScore } from "../hooks/useApi";
import { useActivities } from "../hooks/useApi";
import { useVeterinarians } from "../hooks/useApi";
import { useDashboardStats } from "../hooks/useApi";
import { ActivityType } from "../types/api";

interface HomeDashboardCalmProps {
  onNavigate: (screen: string) => void;
}

export function HomeDashboardCalm({ onNavigate }: HomeDashboardCalmProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user } = useAuth();
  const [showAchievements, setShowAchievements] = useState(false);
  const [animatedHealthScore, setAnimatedHealthScore] = useState(0);
  const [hasNewScan, setHasNewScan] = useState(false);
  const [selectedPetIndex, setSelectedPetIndex] = useState(0);

  // Fetch data from API
  const { pets, loading: petsLoading } = usePets();
  const currentPet = pets && pets.length > 0 ? pets[selectedPetIndex] : null;

  const { healthScore, loading: healthScoreLoading } = useHealthScore(currentPet?.id || "");
  const { activities, loading: activitiesLoading } = useActivities(currentPet?.id || "");
  const { veterinarians, loading: vetsLoading } = useVeterinarians();
  const { stats, loading: statsLoading } = useDashboardStats();

  // Animate health score on mount
  useEffect(() => {
    if (healthScore?.overall_score) {
      const timer = setTimeout(() => {
        setAnimatedHealthScore(Math.round(healthScore.overall_score));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [healthScore]);

  // Process activities for display
  const recentActivity = useMemo(() => {
    if (!activities || activities.length === 0) return [];

    // Get last 3 activities
    return activities.slice(0, 3).map(activity => {
      const timeAgo = getTimeAgo(new Date(activity.timestamp));
      return {
        type: activity.type.toLowerCase(),
        time: timeAgo,
        description: activity.title,
      };
    });
  }, [activities]);

  // Calculate daily goals from activities
  const dailyGoals = useMemo(() => {
    if (!activities) return [
      { id: "feed", label: "Feed", completed: 0, target: 2, icon: Utensils },
      { id: "walk", label: "Walk", completed: 0, target: 1, icon: Footprints },
      { id: "scan", label: "Scan", completed: 0, target: 1, icon: Scan },
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayActivities = activities.filter(a => {
      const activityDate = new Date(a.timestamp);
      activityDate.setHours(0, 0, 0, 0);
      return activityDate.getTime() === today.getTime();
    });

    const mealCount = todayActivities.filter(a => a.type === ActivityType.MEAL).length;
    const walkCount = todayActivities.filter(a => a.type === ActivityType.WALK).length;
    const scanCount = todayActivities.filter(a => a.title.toLowerCase().includes('scan')).length;

    return [
      { id: "feed", label: "Feed", completed: mealCount, target: 2, icon: Utensils },
      { id: "walk", label: "Walk", completed: walkCount, target: 1, icon: Footprints },
      { id: "scan", label: "Scan", completed: scanCount, target: 1, icon: Scan },
    ];
  }, [activities]);

  // Calculate milestones from stats
  const milestones = useMemo(() => {
    if (!stats && !activities) return [];

    const streak = calculateActivityStreak(activities || []);

    return [
      { id: 1, title: "Dental Improvement", subtitle: "Keep up the good work", value: "✓", icon: TrendingUp },
      { id: 2, title: "Activity Streak", subtitle: `${streak} consecutive days`, value: `${streak}d`, icon: ActivityIcon },
    ];
  }, [stats, activities]);

  // Get nearby vets (limit to 2)
  const nearbyVets = useMemo(() => {
    if (!veterinarians || veterinarians.length === 0) return [];
    return veterinarians.slice(0, 2).map(vet => ({
      id: vet.id,
      name: vet.clinic_name,
      distance: calculateDistance(vet.latitude, vet.longitude),
      rating: vet.rating || 0,
      phone: vet.phone,
    }));
  }, [veterinarians]);

  // Calculate wellness ring progress based on daily goals
  const totalCompleted = dailyGoals.reduce((acc, goal) => acc + goal.completed, 0);
  const totalTargets = dailyGoals.reduce((acc, goal) => acc + goal.target, 0);
  const wellnessProgress = (totalCompleted / totalTargets) * 100;
  const circumference = 2 * Math.PI * 70;

  // Show loading state
  if (petsLoading) {
    return (
      <div className="min-h-full gradient-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  // Show message if no pet
  if (!currentPet) {
    return (
      <div className="min-h-full gradient-bg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-10 w-40 h-40 rounded-full border-4 border-white animate-pulse"></div>
          <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full border-4 border-white animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-full p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Welcome to PetScope!</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Get started by adding your first pet to begin tracking their health and wellness
            </p>
            <Button
              onClick={() => onNavigate("pet-setup")}
              className="bg-white text-[#2563EB] hover:bg-white/90 h-14 px-8 rounded-[100px] text-base font-medium shadow-xl"
            >
              Add Your First Pet
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Get user's first name
  const userFirstName = user?.name?.split(' ')[0] || 'there';
  const userName = currentPet?.name ? `${userFirstName} & ${currentPet.name}` : userFirstName;

  return (
    <div className="min-h-full pb-3 relative overflow-hidden">
      {/* Tri-tone Gradient Background */}
      <div className={`absolute inset-0 ${isDarkMode ? 'gradient-bg-light' : 'gradient-bg'} transition-colors duration-500`}></div>

      <div className="relative z-10">
        {/* Hero Section with Pet Card */}
        <div className="px-6 pt-20">
          {/* Welcome Text - on 4pt grid */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={`${isDarkMode ? 'text-gray-700/70' : 'text-white/70'} mb-2 font-medium transition-colors`} style={{ fontSize: '16px', lineHeight: '24px' }}>
              Welcome back, {userName} 🐶
            </p>
            <h1
              className={`${isDarkMode ? 'text-gray-900' : 'text-white'} font-bold tracking-tight transition-colors`}
              style={{ fontSize: '28px', lineHeight: '36px' }}
            >
              Health Dashboard
            </h1>
          </motion.div>

          {/* Pet Selector - Show only if multiple pets */}
          {pets && pets.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-6 flex gap-3 overflow-x-auto scrollbar-hide pb-2"
            >
              {pets.map((pet, index) => (
                <button
                  key={pet.id}
                  onClick={() => setSelectedPetIndex(index)}
                  className={`flex-shrink-0 px-4 py-2 rounded-[20px] border-2 transition-all ${
                    index === selectedPetIndex
                      ? isDarkMode
                        ? 'bg-white/20 border-gray-900/40 backdrop-blur-xl'
                        : 'bg-white/20 border-white/40 backdrop-blur-xl'
                      : isDarkMode
                        ? 'bg-white/5 border-gray-900/20 backdrop-blur-sm'
                        : 'bg-white/5 border-white/20 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`text-lg`}>{pet.photo_url ? '🐕' : '🐕'}</div>
                    <span className={`${isDarkMode ? 'text-gray-900' : 'text-white'} text-sm font-medium`}>
                      {pet.name}
                    </span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

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
                    {currentPet.photo_url ? (
                      <img
                        src={currentPet.photo_url}
                        alt={currentPet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`${isDarkMode ? 'text-gray-700' : 'text-white'} text-3xl`}>🐶</div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-1 font-bold transition-colors`} style={{ fontSize: '20px', lineHeight: '28px' }}>
                    {currentPet.name}
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-700/80' : 'text-white/80'} text-sm font-medium transition-colors`}>
                    {currentPet.breed}{currentPet.age ? ` • ${currentPet.age} years` : ''}
                  </p>
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
                      strokeDashoffset: animatedHealthScore > 0 ? circumference - (animatedHealthScore / 100) * circumference : circumference
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
                    {animatedHealthScore || 0}
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
                  {animatedHealthScore >= 80
                    ? `${currentPet.name}'s energy is trending higher this week 🐕✨`
                    : animatedHealthScore >= 60
                    ? `${currentPet.name} is doing well. Keep it up! 🐕`
                    : `Let's work on improving ${currentPet.name}'s health together 💪`
                  }
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

// Utility functions
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) {
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  }
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

function calculateActivityStreak(activities: any[]): number {
  if (!activities || activities.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const hasActivityOnDay = activities.some(activity => {
      const activityDate = new Date(activity.timestamp);
      activityDate.setHours(0, 0, 0, 0);
      return activityDate.getTime() === currentDate.getTime();
    });

    if (!hasActivityOnDay) break;

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);

    // Limit to reasonable streak length
    if (streak > 365) break;
  }

  return streak;
}

function calculateDistance(lat?: number, lng?: number): string {
  // For now, return a placeholder distance
  // In production, this would calculate distance from user's location
  if (!lat || !lng) return "N/A";

  // Simulate distance calculation (random between 0.5 and 5 miles)
  const distance = (Math.random() * 4.5 + 0.5).toFixed(1);
  return `${distance} mi`;
}
