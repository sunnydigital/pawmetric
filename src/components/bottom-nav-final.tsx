import { Home, Scan, FileText, User } from "lucide-react";

interface BottomNavFinalProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "scans", icon: Scan, label: "Scans" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNavFinal({ activeTab, onTabChange }: BottomNavFinalProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-[#E5E7EB] z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-[16px] transition-all ${
                  isActive
                    ? "text-[#2563EB] bg-blue-50 scale-105"
                    : "text-[#6B7280] hover:text-[#2563EB] hover:bg-[#F9FAFB]"
                }`}
              >
                <Icon className={`w-6 h-6 transition-all ${isActive ? "fill-current" : ""}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
