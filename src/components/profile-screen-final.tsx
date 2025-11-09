import { Card } from "./ui/card";
import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut, Settings } from "lucide-react";

interface ProfileScreenFinalProps {
  onNavigate: (screen: string) => void;
}

const settingsItems = [
  { id: "pet", icon: User, label: "Pet Profile", description: "Manage Max's details" },
  { id: "notifications", icon: Bell, label: "Notifications", description: "Push, email, SMS" },
  { id: "privacy", icon: Shield, label: "Privacy & Security", description: "Data and permissions" },
  { id: "support", icon: HelpCircle, label: "Support", description: "FAQs and contact" },
];

export function ProfileScreenFinal({ onNavigate }: ProfileScreenFinalProps) {
  return (
    <div className="pb-24 px-6 pt-6 space-y-6">
      {/* User Profile Card */}
      <Card className="p-6 border-0 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#34D399] flex items-center justify-center text-white text-2xl">
            JD
          </div>
          <div className="flex-1">
            <h3 className="text-[#111827] mb-1">John Doe</h3>
            <p className="text-sm text-[#6B7280]">john.doe@email.com</p>
          </div>
          <button className="p-2 rounded-xl hover:bg-[#F3F4F6] transition-all">
            <Settings className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        
        <div className="pt-4 border-t border-[#E5E7EB]">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-1">1</div>
              <div className="text-xs text-[#6B7280]">Pet</div>
            </div>
            <div>
              <div className="text-2xl mb-1">24</div>
              <div className="text-xs text-[#6B7280]">Scans</div>
            </div>
            <div>
              <div className="text-2xl mb-1">87</div>
              <div className="text-xs text-[#6B7280]">Avg Score</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Pet Summary */}
      <div>
        <h3 className="mb-3 px-1 text-[#111827]">Current Pet</h3>
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-0 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/50 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEwMjUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Max"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-[#111827] mb-1">Max 🐕</h4>
              <p className="text-sm text-[#6B7280]">Golden Retriever • 5 years • 65 lbs</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6B7280]" />
          </div>
        </Card>
      </div>

      {/* Settings List */}
      <div>
        <h3 className="mb-3 px-1 text-[#111827]">Settings</h3>
        <Card className="overflow-hidden border-0 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`w-full p-4 flex items-center gap-4 hover:bg-[#F9FAFB] transition-all ${
                  index !== settingsItems.length - 1 ? 'border-b border-[#E5E7EB]' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-[#111827] mb-0.5">{item.label}</h4>
                  <p className="text-sm text-[#6B7280]">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6B7280]" />
              </button>
            );
          })}
        </Card>
      </div>

      {/* Subscription Card */}
      <Card className="p-5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] border-0 rounded-[20px] shadow-[0_4px_12px_rgba(245,158,11,0.2)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <div className="flex-1">
            <h4 className="text-white mb-0.5">Premium Plan</h4>
            <p className="text-sm text-white/90">Unlimited scans • 24/7 vet chat</p>
          </div>
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      </Card>

      {/* Logout Button */}
      <button className="w-full p-4 flex items-center justify-center gap-2 text-[#EF4444] hover:bg-red-50 rounded-[20px] transition-all">
        <LogOut className="w-5 h-5" />
        <span>Log Out</span>
      </button>
    </div>
  );
}
