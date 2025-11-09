import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { TrendingUp, Download, Calendar, Utensils, Footprints, Activity, Zap, FileText, Eye, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface ReportsScreenCalmProps {
  onNavigate: (screen: string) => void;
}

const weeklyData = [
  { day: "Mon", health: 85, calories: 850 },
  { day: "Tue", health: 87, calories: 920 },
  { day: "Wed", health: 86, calories: 880 },
  { day: "Thu", health: 88, calories: 910 },
  { day: "Fri", health: 89, calories: 950 },
  { day: "Sat", health: 90, calories: 900 },
  { day: "Sun", health: 87, calories: 870 },
];

const todaysMeals = [
  { time: "7:30 AM", name: "Breakfast", food: "Blue Buffalo Life Protection", calories: 380 },
  { time: "6:00 PM", name: "Dinner", food: "Blue Buffalo Life Protection", calories: 380 },
  { time: "3:00 PM", name: "Treats", food: "Training treats", calories: 50 },
];

const recentDocuments = [
  { id: 1, type: "Vaccination", title: "Rabies Vaccine", date: "Jan 15, 2024", icon: "💉", color: "from-blue-500 to-blue-600" },
  { id: 2, type: "Prescription", title: "Apoquel 16mg", date: "Feb 10, 2024", icon: "📋", color: "from-purple-500 to-purple-600" },
  { id: 3, type: "Diagnosis", title: "Mild Dermatitis", date: "Mar 5, 2024", icon: "🏥", color: "from-green-500 to-green-600" },
];

const stats = [
  { id: 1, label: "Calories In", value: "810", unit: "kcal", icon: Utensils, color: "from-blue-500 to-blue-600" },
  { id: 2, label: "Miles Walked", value: "2.4", unit: "mi", icon: Footprints, color: "from-green-500 to-green-600" },
  { id: 3, label: "Active Minutes", value: "45", unit: "min", icon: Activity, color: "from-purple-500 to-purple-600" },
  { id: 4, label: "Calories Out", value: "620", unit: "kcal", icon: Zap, color: "from-orange-500 to-orange-600" },
];

export function ReportsScreenCalm({ onNavigate }: ReportsScreenCalmProps) {
  return (
    <div className="min-h-full gradient-bg pb-6">
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white font-bold tracking-tight">Activity & Nutrition</h1>
          <button className="w-10 h-10 rounded-[12px] glass-card border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
            <Calendar className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-white/70 font-medium">This Week's Overview</p>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 glass-card border border-white/20 rounded-[24px]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Weekly Trend */}
        <div className="p-5 glass-card border border-white/20 rounded-[24px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white mb-1 font-bold">Health Score Trend</h3>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#34D399]" />
                <span className="text-[#34D399] text-sm">+8% improvement</span>
              </div>
            </div>
          </div>
          
          <div className="h-48 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="day" 
                  stroke="rgba(255,255,255,0.5)" 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)" 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  domain={[80, 95]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '8px 12px',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="health" 
                  stroke="#ffffff" 
                  strokeWidth={3}
                  fill="url(#healthGradient)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pet Documents Section */}
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-white/90 font-bold">Pet Documents</h3>
            <button className="text-white/70 text-sm hover:text-white transition-all">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentDocuments.map((doc, index) => (
              <motion.button
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="w-full p-4 bg-white/15 backdrop-blur-xl border border-white/20 rounded-[24px] hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-br ${doc.color} flex items-center justify-center flex-shrink-0 shadow-lg text-2xl`}>
                    {doc.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-semibold">{doc.title}</h4>
                      <ChevronRight className="w-5 h-5 text-white/50" />
                    </div>
                    <p className="text-white/70 text-sm">{doc.type}</p>
                    <p className="text-white/50 text-xs mt-1">{doc.date}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Add Document Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => onNavigate("document-scanner")}
            className="w-full mt-3 p-4 border-2 border-dashed border-white/30 rounded-[24px] text-white/70 hover:text-white hover:border-white/50 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Scan New Document</span>
          </motion.button>
        </div>

        {/* Today's Meals */}
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-white/90">Today's Meals</h3>
            <span className="text-white/70 text-sm">810 kcal total</span>
          </div>
          <div className="space-y-3">
            {todaysMeals.map((meal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 bg-white/15 backdrop-blur-xl border border-white/20 rounded-[24px]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20">
                    <Utensils className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white">{meal.name}</h4>
                      <span className="text-white">{meal.calories} kcal</span>
                    </div>
                    <p className="text-white/70 text-sm">{meal.food}</p>
                    <p className="text-white/50 text-xs mt-1">{meal.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 button-gradient text-white rounded-[100px] flex items-center justify-center gap-2 transition-all font-medium"
        >
          <Download className="w-5 h-5" />
          <span>Export PDF Report</span>
        </motion.button>

        {/* Weekly Summary Card */}
        <div className="p-5 glass-card border border-white/30 rounded-[24px]">
          <h4 className="text-white mb-3 font-bold">Week Summary</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/70 text-xs mb-1">Avg Health Score</p>
              <p className="text-white text-xl">87.4</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">Total Distance</p>
              <p className="text-white text-xl">16.8 mi</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">Meals Logged</p>
              <p className="text-white text-xl">21</p>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">Scans Done</p>
              <p className="text-white text-xl">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
