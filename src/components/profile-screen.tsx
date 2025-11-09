import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut, Settings } from "lucide-react";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

const menuItems = [
  { icon: User, label: "Pet Profile", screen: "pet-profile" },
  { icon: Bell, label: "Notifications", screen: "notifications" },
  { icon: Shield, label: "Privacy & Security", screen: "privacy" },
  { icon: HelpCircle, label: "Help & Support", screen: "help" },
  { icon: Settings, label: "App Settings", screen: "settings" },
];

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#1A202C] mb-2">Profile</h1>
        <p className="text-[#718096]">Manage your account and settings</p>
      </div>

      {/* User Info Card */}
      <Card className="p-5 shadow-sm border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2B6CB0] to-[#63B3ED] flex items-center justify-center text-white">
            <span className="text-2xl">👤</span>
          </div>
          <div className="flex-1">
            <h3 className="text-[#1A202C]">Sarah Johnson</h3>
            <p className="text-[#718096]">sarah.j@email.com</p>
          </div>
        </div>
      </Card>

      {/* Current Pet */}
      <Card className="p-5 shadow-sm border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[#1A202C]">Current Pet</h4>
          <Button variant="ghost" size="sm" className="text-[#2B6CB0] h-auto p-0">
            Switch
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#EDF2F7] flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEwMjUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Max"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[#1A202C]">Max 🐕</p>
            <p className="text-sm text-[#718096]">Golden Retriever • 5 years</p>
          </div>
        </div>
      </Card>

      {/* Menu Items */}
      <Card className="shadow-sm border-[#E2E8F0] divide-y divide-[#E2E8F0]">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full p-4 flex items-center gap-3 hover:bg-[#F7FAFC] transition-colors"
              onClick={() => onNavigate(item.screen)}
            >
              <div className="w-10 h-10 rounded-full bg-[#EDF2F7] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#2B6CB0]" />
              </div>
              <span className="flex-1 text-left text-[#1A202C]">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-[#CBD5E0]" />
            </button>
          );
        })}
      </Card>

      {/* Subscription Card */}
      <Card className="p-5 bg-gradient-to-br from-[#2B6CB0] to-[#63B3ED] text-white border-0 shadow-lg">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-white mb-1">Premium Plan</h4>
            <p className="text-white/90 text-sm">Unlimited scans • Vet chat • Priority support</p>
          </div>
          <span className="text-2xl">✨</span>
        </div>
        <Button className="w-full mt-3 bg-white text-[#2B6CB0] hover:bg-white/90">
          Manage Subscription
        </Button>
      </Card>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full border-[#E53E3E] text-[#E53E3E] hover:bg-red-50"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>

      {/* App Version */}
      <p className="text-center text-sm text-[#CBD5E0]">PetScope v1.2.0</p>
    </div>
  );
}
