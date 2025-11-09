import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Activity, Utensils, Footprints } from "lucide-react";

interface ReportsScreenFinalProps {
  onNavigate: (screen: string) => void;
}

const weeklyData = [
  { day: "Mon", activity: 45, calories: 380 },
  { day: "Tue", activity: 60, calories: 420 },
  { day: "Wed", activity: 40, calories: 360 },
  { day: "Thu", activity: 55, calories: 400 },
  { day: "Fri", activity: 70, calories: 450 },
  { day: "Sat", activity: 80, calories: 480 },
  { day: "Sun", activity: 50, calories: 390 },
];

const meals = [
  { time: "8:00 AM", name: "Breakfast", food: "Premium dry food", kcal: 250, icon: "🍖" },
  { time: "6:00 PM", name: "Dinner", food: "Wet food + vegetables", kcal: 300, icon: "🥩" },
  { time: "3:00 PM", name: "Treats", food: "Dental chews", kcal: 50, icon: "🦴" },
];

export function ReportsScreenFinal({ onNavigate }: ReportsScreenFinalProps) {
  const maxActivity = Math.max(...weeklyData.map(d => d.activity));
  const maxCalories = Math.max(...weeklyData.map(d => d.calories));

  return (
    <div className="pb-24 px-6 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#111827] mb-2">Reports</h1>
        <p className="text-[#6B7280]">Track nutrition and activity trends</p>
      </div>

      {/* Daily Summary */}
      <Card className="p-5 border-0 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Today's Summary</h3>
          <Badge className="bg-gradient-to-r from-[#2563EB] to-[#34D399] text-white border-0 rounded-full">
            Active Day
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Utensils className="w-6 h-6 text-[#2563EB]" />
            </div>
            <div className="text-2xl mb-1">600</div>
            <div className="text-xs text-[#6B7280]">Calories In</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#34D399]" />
            </div>
            <div className="text-2xl mb-1">480</div>
            <div className="text-xs text-[#6B7280]">Calories Out</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <Footprints className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div className="text-2xl mb-1">2.4</div>
            <div className="text-xs text-[#6B7280]">Miles</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Active Minutes</span>
            <span className="text-[#111827]">65 min</span>
          </div>
        </div>
      </Card>

      {/* Weekly Trend */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-[#111827]">Weekly Trend</h3>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-[#34D399]" />
            <span className="text-[#34D399]">+12%</span>
          </div>
        </div>
        
        <Card className="p-5 border-0 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {/* Chart */}
          <div className="h-48 flex items-end justify-between gap-2 mb-4">
            {weeklyData.map((data, index) => {
              const activityHeight = (data.activity / maxActivity) * 100;
              const caloriesHeight = (data.calories / maxCalories) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1 h-full justify-end">
                    {/* Activity bar */}
                    <div 
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#2563EB] to-[#60A5FA] transition-all hover:opacity-80"
                      style={{ height: `${activityHeight}%` }}
                    ></div>
                    {/* Calories bar */}
                    <div 
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#34D399] to-[#6EE7B7] transition-all hover:opacity-80"
                      style={{ height: `${caloriesHeight}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[#6B7280]">{data.day}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
              <span className="text-[#6B7280]">Activity (min)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#34D399]"></div>
              <span className="text-[#6B7280]">Calories</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Meals List */}
      <div>
        <h3 className="mb-3 px-1 text-[#111827]">Today's Meals</h3>
        <Card className="p-4 border-0 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0 text-2xl">
                  {meal.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#111827]">{meal.name}</h4>
                    <Badge variant="outline" className="border-[#F59E0B] text-[#F59E0B] bg-orange-50 rounded-full">
                      {meal.kcal} kcal
                    </Badge>
                  </div>
                  <p className="text-sm text-[#6B7280]">{meal.food}</p>
                  <p className="text-xs text-[#9CA3AF]">{meal.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
