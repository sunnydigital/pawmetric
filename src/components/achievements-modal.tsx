import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Award, Trophy, Star, Zap, Heart, Target, Flame, Eye, Activity } from "lucide-react";

interface AchievementsModalProps {
  open: boolean;
  onClose: () => void;
}

const achievements = [
  {
    id: 1,
    icon: Flame,
    title: "7-Day Streak",
    description: "Logged health for 7 days straight",
    unlocked: true,
    date: "Oct 15, 2025",
  },
  {
    id: 2,
    icon: Star,
    title: "First Scan",
    description: "Completed your first AI health check",
    unlocked: true,
    date: "Oct 10, 2025",
  },
  {
    id: 3,
    icon: Trophy,
    title: "Health Champion",
    description: "Reached 90+ health score",
    unlocked: true,
    date: "Oct 18, 2025",
  },
  {
    id: 4,
    icon: Target,
    title: "Perfect Week",
    description: "Hit all daily goals for 7 days",
    unlocked: true,
    date: "Oct 20, 2025",
  },
  {
    id: 5,
    icon: Activity,
    title: "Active Explorer",
    description: "Walk 50 total miles",
    unlocked: false,
    progress: 32,
    target: 50,
  },
  {
    id: 6,
    icon: Zap,
    title: "Dental Expert",
    description: "Complete 10 dental scans",
    unlocked: false,
    progress: 6,
    target: 10,
  },
  {
    id: 7,
    icon: Eye,
    title: "Eye Care Pro",
    description: "Complete 20 eye scans",
    unlocked: false,
    progress: 12,
    target: 20,
  },
  {
    id: 8,
    icon: Heart,
    title: "30-Day Legend",
    description: "Maintain a 30-day health streak",
    unlocked: false,
    progress: 14,
    target: 30,
  },
];

export function AchievementsModal({ open, onClose }: AchievementsModalProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#34D399] border-white/20 text-white p-0 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <DialogTitle className="text-white text-2xl">Achievements</DialogTitle>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30">
                <span className="text-white">{unlockedCount}/{totalCount}</span>
              </div>
            </div>
            <DialogDescription className="text-white/80 text-sm">
              Keep Max healthy to unlock special badges and rewards
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Achievements Grid */}
        <div className="max-h-[500px] overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-5 rounded-[24px] border transition-all ${
                    achievement.unlocked
                      ? "bg-white/20 backdrop-blur-xl border-white/30 shadow-lg"
                      : "bg-white/5 backdrop-blur-sm border-white/10"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center transition-all ${
                      achievement.unlocked
                        ? "bg-white/30 border-2 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        : "bg-white/10 border border-white/20 opacity-50"
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${achievement.unlocked ? "text-white" : "text-white/40"}`} />
                  </div>

                  {/* Title */}
                  <h4
                    className={`text-center mb-2 text-sm ${
                      achievement.unlocked ? "text-white" : "text-white/50"
                    }`}
                  >
                    {achievement.title}
                  </h4>

                  {/* Description */}
                  <p
                    className={`text-xs text-center mb-3 leading-relaxed ${
                      achievement.unlocked ? "text-white/80" : "text-white/40"
                    }`}
                  >
                    {achievement.description}
                  </p>

                  {/* Progress or Date */}
                  {achievement.unlocked ? (
                    <div className="text-center">
                      <div className="inline-block px-3 py-1 bg-white/20 rounded-full">
                        <span className="text-xs text-white/90">
                          {achievement.date}
                        </span>
                      </div>
                    </div>
                  ) : achievement.progress !== undefined ? (
                    <div>
                      <div className="flex justify-between text-xs text-white/60 mb-2">
                        <span>{achievement.progress}</span>
                        <span>{achievement.target}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/40 rounded-full transition-all"
                          style={{
                            width: `${(achievement.progress! / achievement.target!) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-xs text-white/40">Locked</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={onClose}
            className="w-full h-12 bg-white text-[#2563EB] rounded-[20px] hover:bg-white/90 transition-all"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
