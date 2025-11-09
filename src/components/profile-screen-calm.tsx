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
  Edit
} from "lucide-react";
import { Switch } from "./ui/switch";
import { useState } from "react";

interface ProfileScreenCalmProps {
  onNavigate: (screen: string) => void;
}

const settingsSections = [
  {
    id: "pet",
    title: "Pet Profile",
    icon: User,
    items: [
      { label: "Max's Details", value: "Golden Retriever • 5 years", action: "edit" },
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
  const [toggleStates, setToggleStates] = useState({
    push: true,
    email: false,
    sms: true,
  });

  const handleToggle = (key: string) => {
    setToggleStates(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="min-h-full gradient-bg pb-24">
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
                <div className="text-white text-2xl">JD</div>
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white text-[#2563EB] flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">John Doe</h2>
              <p className="text-white/80 text-sm">john.doe@email.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <User className="w-4 h-4 text-white/70" />
                <div className="text-2xl text-white">1</div>
              </div>
              <div className="text-xs text-white/70">Pets</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Scan className="w-4 h-4 text-white/70" />
                <div className="text-2xl text-white">24</div>
              </div>
              <div className="text-xs text-white/70">Scans</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-4 h-4 text-white/70" />
                <div className="text-2xl text-white">87</div>
              </div>
              <div className="text-xs text-white/70">Avg Score</div>
            </div>
          </div>
        </motion.div>

        {/* Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
                  <div
                    key={index}
                    className={`p-4 flex items-center justify-between ${
                      index !== section.items.length - 1 ? "border-b border-white/10" : ""
                    }`}
                  >
                    <div className="flex-1">
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
                      ) : item.action === "edit" || item.action === "view" ? (
                        <ChevronRight className="w-5 h-5 text-white/60" />
                      ) : null}
                    </div>
                  </div>
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
