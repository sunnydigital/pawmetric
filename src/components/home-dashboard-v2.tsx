import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Utensils, Footprints, Scan, MessageCircle, Plus } from "lucide-react";

interface HomeDashboardV2Props {
  onNavigate: (screen: string) => void;
}

const recentActivity = [
  { type: "meal", time: "2h ago", description: "Logged breakfast", icon: "🍗" },
  { type: "walk", time: "5h ago", description: "Morning walk - 1.2 mi", icon: "🚶" },
  { type: "scan", time: "Yesterday", description: "Eye scan completed", icon: "👁️" },
];

export function HomeDashboardV2({ onNavigate }: HomeDashboardV2Props) {
  return (
    <div className="pb-24 px-6 pt-6 space-y-6">
      {/* Pet Profile Card */}
      <Card className="p-6 bg-gradient-to-br from-[#2563EB] to-[#60A5FA] text-white border-0 rounded-3xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-3 border-white/30 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEwMjUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Max"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-white mb-1">Max 🐕</h2>
            <div className="text-white/90 text-sm mb-2">Golden Retriever</div>
            <div className="flex gap-4 text-white/80 text-sm">
              <span>5 years</span>
              <span>•</span>
              <span>65 lbs</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
          <div className="text-center">
            <div className="text-white/70 text-xs mb-1">Health Score</div>
            <div className="text-2xl">87/100</div>
          </div>
          <div className="text-center">
            <div className="text-white/70 text-xs mb-1">Last Scan</div>
            <div className="text-sm">Yesterday</div>
          </div>
          <div className="text-center">
            <div className="text-white/70 text-xs mb-1">Next Checkup</div>
            <div className="text-sm">14 days</div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-3 px-1 text-[#111827]">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate("log-meal")}
            className="h-24 flex flex-col gap-2 bg-white text-[#2563EB] hover:bg-[#F9FAFB] border border-[#E5E7EB] shadow-sm rounded-2xl transition-all hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
              <Utensils className="w-6 h-6 text-[#2563EB]" />
            </div>
            <span>Log Meal</span>
          </Button>
          <Button
            onClick={() => onNavigate("log-walk")}
            className="h-24 flex flex-col gap-2 bg-white text-[#6EE7B7] hover:bg-[#F9FAFB] border border-[#E5E7EB] shadow-sm rounded-2xl transition-all hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] flex items-center justify-center">
              <Footprints className="w-6 h-6 text-[#059669]" />
            </div>
            <span className="text-[#111827]">Log Walk</span>
          </Button>
        </div>
      </div>

      {/* AI Health Check CTA */}
      <Button
        onClick={() => onNavigate("health-check")}
        className="w-full h-16 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white hover:from-[#1D4ED8] hover:to-[#3B82F6] border-0 shadow-lg rounded-2xl transition-all hover:shadow-xl"
      >
        <Scan className="w-5 h-5 mr-2" />
        Start AI Health Check
      </Button>

      {/* Ask a Vet */}
      <Card 
        className="p-4 bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] border-0 shadow-md rounded-2xl cursor-pointer hover:shadow-lg transition-all"
        onClick={() => onNavigate("vet-chat")}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-[#059669]" />
          </div>
          <div className="flex-1">
            <h4 className="text-[#065F46] mb-0.5">Ask a Vet</h4>
            <p className="text-sm text-[#047857]">Get expert advice 24/7</p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <div>
        <h3 className="mb-3 px-1 text-[#111827]">Recent Activity</h3>
        <Card className="p-4 shadow-sm border-[#E5E7EB] rounded-2xl">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[#111827]">{activity.description}</p>
                  <p className="text-sm text-[#6B7280]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Floating Add Button */}
      <Button
        size="icon"
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#2563EB] to-[#60A5FA] text-white shadow-2xl hover:shadow-xl transition-all z-40"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
