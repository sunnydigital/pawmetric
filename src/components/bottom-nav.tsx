import { Home, Scan, FileText, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "scans", icon: Scan, label: "Scans" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "profile", icon: User, label: "Profile" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-50">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-[#2B6CB0]"
                    : "text-[#718096] hover:text-[#2B6CB0]"
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
