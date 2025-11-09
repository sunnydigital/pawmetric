import { Home, Scan, FileText, User } from "lucide-react";

interface BottomNavV2Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "scans", icon: Scan, label: "Scans" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNavV2({ activeTab, onTabChange }: BottomNavV2Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-[#E5E7EB] z-50">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? "text-[#2563EB] bg-blue-50"
                    : "text-[#6B7280] hover:text-[#2563EB] hover:bg-[#F9FAFB]"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
