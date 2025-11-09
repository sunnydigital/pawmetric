import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Dog, Utensils, Footprints, Scan, MessageSquare } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface HomeDashboardProps {
  onNavigate: (screen: string) => void;
}

const activityData = [
  { day: "Mon", score: 75 },
  { day: "Tue", score: 82 },
  { day: "Wed", score: 78 },
  { day: "Thu", score: 85 },
  { day: "Fri", score: 88 },
  { day: "Sat", score: 92 },
  { day: "Sun", score: 87 },
];

const recentActivity = [
  { type: "meal", time: "2 hours ago", description: "Logged breakfast - Kibble" },
  { type: "walk", time: "5 hours ago", description: "Morning walk - 1.2 miles" },
  { type: "scan", time: "Yesterday", description: "Dental scan completed" },
];

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* Pet Profile Card */}
      <Card className="p-5 bg-gradient-to-br from-[#2B6CB0] to-[#63B3ED] text-white border-0 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-white/40">
            <img 
              src="https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEwMjUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Max"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2>Max</h2>
              <span className="text-white/90">🐕</span>
            </div>
            <div className="flex gap-4 mt-1 text-white/90">
              <span>5 years</span>
              <span>•</span>
              <span>65 lbs</span>
            </div>
            <div className="mt-2 text-white/80">Golden Retriever</div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-3 px-1 text-[#1A202C]">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate("log-meal")}
            className="h-auto py-6 flex flex-col gap-2 bg-white text-[#2B6CB0] hover:bg-[#F7FAFC] border border-[#E2E8F0] shadow-sm"
          >
            <Utensils className="w-6 h-6" />
            <span>Log Meal</span>
          </Button>
          <Button
            onClick={() => onNavigate("log-walk")}
            className="h-auto py-6 flex flex-col gap-2 bg-white text-[#2B6CB0] hover:bg-[#F7FAFC] border border-[#E2E8F0] shadow-sm"
          >
            <Footprints className="w-6 h-6" />
            <span>Log Walk</span>
          </Button>
          <Button
            onClick={() => onNavigate("health-check")}
            className="h-auto py-6 flex flex-col gap-2 bg-[#2B6CB0] text-white hover:bg-[#2C5282] border-0 shadow-md col-span-2"
          >
            <Scan className="w-6 h-6" />
            <span>AI Health Check</span>
          </Button>
        </div>
      </div>

      {/* Ask a Vet Banner */}
      <Card className="p-4 bg-gradient-to-r from-[#63B3ED] to-[#90CDF4] border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-white">
            <h4>Ask a Vet</h4>
            <p className="text-white/90 text-sm">Get expert advice 24/7</p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <div>
        <h3 className="mb-3 px-1 text-[#1A202C]">Recent Activity</h3>
        <Card className="p-4 shadow-sm border-[#E2E8F0]">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EDF2F7] flex items-center justify-center flex-shrink-0">
                  {activity.type === "meal" && <Utensils className="w-5 h-5 text-[#2B6CB0]" />}
                  {activity.type === "walk" && <Footprints className="w-5 h-5 text-[#2B6CB0]" />}
                  {activity.type === "scan" && <Scan className="w-5 h-5 text-[#2B6CB0]" />}
                </div>
                <div className="flex-1">
                  <p className="text-[#1A202C]">{activity.description}</p>
                  <p className="text-sm text-[#718096]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Health Summary */}
      <div>
        <h3 className="mb-3 px-1 text-[#1A202C]">Weekly Health Summary</h3>
        <Card className="p-4 shadow-sm border-[#E2E8F0]">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#718096]">Overall Health Score</span>
              <span className="text-[#2B6CB0]">87/100</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={activityData}>
              <XAxis 
                dataKey="day" 
                stroke="#CBD5E0"
                tick={{ fill: '#718096', fontSize: 12 }}
              />
              <YAxis 
                stroke="#CBD5E0"
                tick={{ fill: '#718096', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#2B6CB0" 
                strokeWidth={3}
                dot={{ fill: '#2B6CB0', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
