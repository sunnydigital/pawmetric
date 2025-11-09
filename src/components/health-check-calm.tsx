import {
  Eye,
  Smile,
  Heart,
  Footprints as Paw,
  Sparkles,
  Ear,
  Scan,
  Activity,
  Bone,
} from "lucide-react";
import { motion } from "motion/react";

interface HealthCheckCalmProps {
  onNavigate: (screen: string, params?: any) => void;
}

const scanTypes = [
  {
    id: "eyes",
    title: "Eye Scan",
    subtitle: "Check for signs of infection or irritation",
    emoji: "👁️",
    icon: Eye,
  },
  {
    id: "ears",
    title: "Ear Scan",
    subtitle: "Detect ear infections and irritation",
    emoji: "👂",
    icon: Ear,
  },
  {
    id: "nose",
    title: "Nose Scan",
    subtitle: "Check nasal health and discharge",
    emoji: "👃",
    icon: Scan,
  },
  {
    id: "dental",
    title: "Dental Scan",
    subtitle: "Monitor teeth and gum health",
    emoji: "🦷",
    icon: Smile,
  },
  {
    id: "skin",
    title: "Skin & Coat",
    subtitle: "Assess coat quality and skin conditions",
    emoji: "🐕",
    icon: Activity,
  },
  {
    id: "neck",
    title: "Neck & Throat",
    subtitle: "Check for swelling or abnormalities",
    emoji: "🔍",
    icon: Heart,
  },
  {
    id: "body",
    title: "Body & Abdomen",
    subtitle: "Monitor body condition and abdomen",
    emoji: "🫀",
    icon: Activity,
  },
  {
    id: "legs",
    title: "Legs & Joints",
    subtitle: "Assess mobility and joint health",
    emoji: "🦴",
    icon: Bone,
  },
  {
    id: "paws",
    title: "Paws",
    subtitle: "Inspect paw pads and nails",
    emoji: "🐾",
    icon: Paw,
  },
  {
    id: "tail",
    title: "Tail Scan",
    subtitle: "Check tail health and movement",
    emoji: "🦴",
    icon: Activity,
  },
];

export function HealthCheckCalm({
  onNavigate,
}: HealthCheckCalmProps) {
  return (
    <div className="min-h-full gradient-bg pb-24">
      {/* Header Section */}
      <motion.div
        className="px-6 pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-[12px] flex items-center justify-center border-2 border-white/30 relative overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Sparkles className="w-10 h-10 text-white relative z-10" />

          {/* Inner light pulse */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <h1
          className="text-white mb-3 font-bold tracking-tight"
          style={{ fontSize: "28px", lineHeight: "36px" }}
        >
          AI Health Check
        </h1>
        <p
          className="text-white/70 max-w-sm mx-auto font-medium"
          style={{ fontSize: "16px", lineHeight: "24px" }}
        >
          Choose a scan to monitor Cocoa's health with
          AI-powered analysis
        </p>
      </motion.div>

      {/* Content */}
      <div className="px-6 space-y-4">
        {/* Start All Scans Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full h-14 button-gradient text-white rounded-[100px] flex items-center justify-center gap-2 font-medium overflow-hidden"
          onClick={() =>
            onNavigate("scan-camera", {
              type: "all",
              title: "Complete Scan",
            })
          }
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontSize: "16px", lineHeight: "24px" }}
        >
          {/* Inner light pulse */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <Sparkles className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Start All Scans</span>
        </motion.button>

        {/* Individual Scan Cards */}
        <div className="space-y-3 pt-2">
          {scanTypes.map((scan, index) => (
            <motion.button
              key={scan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.1,
              }}
              className="w-full p-5 border rounded-[24px] transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              onClick={() =>
                onNavigate("scan-camera", {
                  type: scan.id,
                  title: scan.title,
                })
              }
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-[12px] backdrop-blur-sm flex items-center justify-center text-3xl flex-shrink-0 border border-white/20"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {scan.emoji}
                </div>
                <div className="flex-1 text-left">
                  <h3
                    className="text-white mb-1 font-bold"
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    {scan.title}
                  </h3>
                  <p
                    className="text-white/70 font-medium"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    {scan.subtitle}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* View History Link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full h-12 border text-white rounded-[100px] transition-all font-medium text-center"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontSize: "14px",
            lineHeight: "20px",
          }}
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.12)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          View Check History
        </motion.button>
      </div>
    </div>
  );
}