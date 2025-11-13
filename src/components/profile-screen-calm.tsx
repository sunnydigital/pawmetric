import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import {
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Crown,
  Settings,
  Scan,
  Award,
  Edit,
  Loader2
} from "lucide-react";
import { Switch } from "./ui/switch";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePets } from "../hooks/useApi";
import { api } from "../services/api";

interface ProfileScreenCalmProps {
  onNavigate: (screen: string) => void;
}

const getSettingsSections = (petName?: string, petBreed?: string, petAge?: number) => [
  {
    id: "pet",
    title: "Pet Profile",
    icon: User,
    items: [
      {
        label: petName ? `${petName}'s Details` : "Pet Details",
        value: petName ? `${petBreed || 'Unknown breed'} • ${petAge || 0} years` : "No pet added",
        action: "edit"
      },
      { label: "Add Another Pet", value: undefined, action: "add-pet" },
      { label: "Health Focus Areas", value: "Dental, General Wellness", action: "edit" },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Push Notifications", toggle: true, enabled: true },
      { label: "Email Updates", toggle: true, enabled: false },
      { label: "SMS Reminders", toggle: true, enabled: true },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: Shield,
    items: [
      { label: "Data Privacy", action: "view" },
      { label: "App Permissions", action: "view" },
      { label: "Delete Account", action: "view", danger: true },
    ],
  },
  {
    id: "support",
    title: "Support",
    icon: HelpCircle,
    items: [
      { label: "FAQ & Help Center", action: "view" },
      { label: "Contact Support", action: "view" },
      { label: "App Version", value: "1.0.2" },
    ],
  },
];

export function ProfileScreenCalm({ onNavigate }: ProfileScreenCalmProps) {
  const { user, logout } = useAuth();
  const { pets, loading: petsLoading } = usePets();
  const [selectedPetIndex, setSelectedPetIndex] = useState(0);
  const [toggleStates, setToggleStates] = useState({
    push: true,
    email: false,
    sms: true,
  });
  const [totalScans, setTotalScans] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  const handleToggle = (key: string) => {
    setToggleStates(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  // Get selected pet
  const primaryPet = pets && pets.length > 0 ? pets[selectedPetIndex] : null;

  // Get user initials
  const userInitials = useMemo(() => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  }, [user]);

  // Fetch stats for all pets
  useEffect(() => {
    const fetchStats = async () => {
      if (!pets || pets.length === 0) {
        setLoadingStats(false);
        return;
      }

      try {
        let totalScansCount = 0;
        let totalScoreSum = 0;
        let petsWithScores = 0;

        for (const pet of pets) {
          try {
            // Fetch scans for this pet
            const scansResponse = await api.getHealthScans(pet.id);
            if (scansResponse.success && scansResponse.data.scans) {
              totalScansCount += scansResponse.data.scans.length;
            }

            // Fetch health score for this pet
            const scoreResponse = await api.getHealthScore(pet.id);
            if (scoreResponse.success && scoreResponse.data.health_score) {
              totalScoreSum += scoreResponse.data.health_score.overall_score;
              petsWithScores++;
            }
          } catch (error) {
            console.error(`Error fetching stats for pet ${pet.id}:`, error);
          }
        }

        setTotalScans(totalScansCount);
        setAvgScore(petsWithScores > 0 ? Math.round(totalScoreSum / petsWithScores) : 0);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [pets]);

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate("login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get settings sections with dynamic pet data
  const settingsSections = useMemo(() =>
    getSettingsSections(primaryPet?.name, primaryPet?.breed, primaryPet?.age),
    [primaryPet]
  );

  return (
    <div className="min-h-full gradient-bg pb-4">
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-white mb-2 font-bold tracking-tight">Profile</h1>
        <p className="text-white/70 font-medium">Manage your account and settings</p>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-white/15 backdrop-blur-xl border border-white/20 rounded-[32px]"
        >
          <div className="flex items-center gap-4 mb-6">
            {/* User Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl">
                <div className="text-white text-2xl">{userInitials}</div>
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white text-[#2563EB] flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">{user?.name || "User"}</h2>
              <p className="text-white/80 text-sm">{user?.email || ""}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <User className="w-4 h-4 text-white/70" />
                {petsLoading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <div className="text-2xl text-white">{pets?.length || 0}</div>
                )}
              </div>
              <div className="text-xs text-white/70">Pets</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Scan className="w-4 h-4 text-white/70" />
                {loadingStats ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <div className="text-2xl text-white">{totalScans}</div>
                )}
              </div>
              <div className="text-xs text-white/70">Scans</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-4 h-4 text-white/70" />
                {loadingStats ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <div className="text-2xl text-white">{avgScore}</div>
                )}
              </div>
              <div className="text-xs text-white/70">Avg Score</div>
            </div>
          </div>
        </motion.div>

        {/* Pet Switcher - Only show if multiple pets */}
        {pets && pets.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          >
            {pets.map((pet, index) => (
              <button
                key={pet.id}
                onClick={() => setSelectedPetIndex(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-[20px] border-2 transition-all ${
                  index === selectedPetIndex
                    ? "bg-white/20 backdrop-blur-xl border-white/40"
                    : "bg-white/5 backdrop-blur-sm border-white/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="text-lg">🐕</div>
                  <span className="text-white text-sm font-medium">{pet.name}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: pets && pets.length > 1 ? 0.15 : 0.1 }}
          className="p-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[32px] shadow-2xl border-2 border-amber-400/50"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Upgrade to Premium</h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Unlock unlimited scans, advanced analytics, and priority vet support
              </p>
              <Button className="w-full bg-white text-amber-600 hover:bg-white/90 h-12 rounded-[20px]">
                Start Free Trial
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h3 className="text-white/90 mb-3 px-2 flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {section.title}
              </h3>
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-[24px] overflow-hidden">
                {section.items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.action === "add-pet") {
                        onNavigate("pet-setup");
                      }
                    }}
                    disabled={!item.action || (item.action !== "add-pet")}
                    className={`w-full p-4 flex items-center justify-between ${
                      index !== section.items.length - 1 ? "border-b border-white/10" : ""
                    } ${item.action === "add-pet" ? "hover:bg-white/10 cursor-pointer" : "cursor-default"} transition-colors`}
                  >
                    <div className="flex-1 text-left">
                      <h4 className={`text-white text-sm mb-1 ${item.danger ? "text-red-300" : ""}`}>
                        {item.label}
                      </h4>
                      {item.value && (
                        <p className="text-white/60 text-xs">{item.value}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      {item.toggle ? (
                        <Switch
                          checked={
                            item.label.includes("Push")
                              ? toggleStates.push
                              : item.label.includes("Email")
                              ? toggleStates.email
                              : toggleStates.sms
                          }
                          onCheckedChange={() =>
                            handleToggle(
                              item.label.includes("Push")
                                ? "push"
                                : item.label.includes("Email")
                                ? "email"
                                : "sms"
                            )
                          }
                        />
                      ) : item.action === "edit" || item.action === "view" || item.action === "add-pet" ? (
                        <ChevronRight className="w-5 h-5 text-white/60" />
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onClick={handleLogout}
          className="w-full h-14 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-[24px] flex items-center justify-center gap-2 hover:bg-white/15 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </motion.button>

        {/* App Info */}
        <div className="text-center py-4">
          <p className="text-white/50 text-xs">PetScope v1.0.2</p>
          <p className="text-white/40 text-xs mt-1">Made with care for your pets</p>
        </div>
      </div>
    </div>
  );
}
