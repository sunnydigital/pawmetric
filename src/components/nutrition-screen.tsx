import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { Utensils, Footprints, TrendingUp } from "lucide-react";

interface NutritionScreenProps {
  onNavigate: (screen: string) => void;
}

const weeklyData = [
  { day: "Mon", calories: 1200, activity: 45 },
  { day: "Tue", calories: 1350, activity: 30 },
  { day: "Wed", calories: 1100, activity: 60 },
  { day: "Thu", calories: 1280, activity: 40 },
  { day: "Fri", calories: 1400, activity: 50 },
  { day: "Sat", calories: 1500, activity: 75 },
  { day: "Sun", calories: 1320, activity: 55 },
];

const todayMeals = [
  { time: "8:00 AM", type: "Breakfast", food: "Dry Kibble", calories: 450 },
  { time: "12:30 PM", type: "Lunch", food: "Wet Food", calories: 380 },
  { time: "6:00 PM", type: "Dinner", food: "Dry Kibble", calories: 450 },
];

const todayWalks = [
  { time: "7:30 AM", duration: "25 min", distance: "1.1 mi", intensity: "Moderate" },
  { time: "5:00 PM", duration: "35 min", distance: "1.5 mi", intensity: "Vigorous" },
];

export function NutritionScreen({ onNavigate }: NutritionScreenProps) {
  const totalCalories = 1280;
  const targetCalories = 1400;
  const caloriesBurned = 420;
  const caloriesPercentage = (totalCalories / targetCalories) * 100;

  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#1A202C] mb-2">Nutrition & Activity</h1>
        <p className="text-[#718096]">Today's overview for Max</p>
      </div>

      {/* Daily Summary */}
      <Card className="p-5 shadow-sm border-[#E2E8F0]">
        <h3 className="text-[#1A202C] mb-4">Daily Summary</h3>
        
        {/* Calories */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#2B6CB0]" />
              <span className="text-[#1A202C]">Calories Intake</span>
            </div>
            <span className="text-[#2B6CB0]">
              {totalCalories} / {targetCalories} kcal
            </span>
          </div>
          <Progress value={caloriesPercentage} className="h-2" />
        </div>

        {/* Activity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-[#63B3ED]" />
              <span className="text-[#1A202C]">Calories Burned</span>
            </div>
            <span className="text-[#63B3ED]">{caloriesBurned} kcal</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="text-center p-3 bg-[#F7FAFC] rounded-lg">
              <div className="text-[#2B6CB0]">60 min</div>
              <div className="text-xs text-[#718096] mt-1">Walk Time</div>
            </div>
            <div className="text-center p-3 bg-[#F7FAFC] rounded-lg">
              <div className="text-[#2B6CB0]">2.6 mi</div>
              <div className="text-xs text-[#718096] mt-1">Distance</div>
            </div>
            <div className="text-center p-3 bg-[#F7FAFC] rounded-lg">
              <div className="text-[#2B6CB0]">2 walks</div>
              <div className="text-xs text-[#718096] mt-1">Sessions</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Trend */}
      <Card className="p-5 shadow-sm border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[#2B6CB0]" />
          <h3 className="text-[#1A202C]">Weekly Trend</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="day" 
              stroke="#CBD5E0"
              tick={{ fill: '#718096', fontSize: 12 }}
            />
            <YAxis 
              stroke="#CBD5E0"
              tick={{ fill: '#718096', fontSize: 12 }}
            />
            <Bar dataKey="calories" fill="#2B6CB0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Today's Meals */}
      <div>
        <h3 className="mb-3 px-1 text-[#1A202C]">Today's Meals</h3>
        <Card className="p-4 shadow-sm border-[#E2E8F0]">
          <div className="space-y-3">
            {todayMeals.map((meal, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-[#E2E8F0] last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-[#EDF2F7] flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-5 h-5 text-[#2B6CB0]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[#1A202C]">{meal.type}</p>
                    <span className="text-sm text-[#2B6CB0]">{meal.calories} kcal</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-[#718096]">{meal.food}</p>
                    <span className="text-xs text-[#CBD5E0]">•</span>
                    <p className="text-sm text-[#718096]">{meal.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Today's Walks */}
      <div>
        <h3 className="mb-3 px-1 text-[#1A202C]">Today's Walks</h3>
        <Card className="p-4 shadow-sm border-[#E2E8F0]">
          <div className="space-y-3">
            {todayWalks.map((walk, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-[#E2E8F0] last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-[#EDF2F7] flex items-center justify-center flex-shrink-0">
                  <Footprints className="w-5 h-5 text-[#63B3ED]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[#1A202C]">{walk.duration}</p>
                    <span className="text-sm text-[#63B3ED]">{walk.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-[#718096]">{walk.intensity}</p>
                    <span className="text-xs text-[#CBD5E0]">•</span>
                    <p className="text-sm text-[#718096]">{walk.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
