import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle, CheckCircle, MessageCircle, RotateCcw, Download, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface ScanResultsCalmProps {
  scanType?: string;
  scanTitle?: string;
  onNavigate: (screen: string) => void;
}

export function ScanResultsCalm({ scanType = "eye", scanTitle = "Eye Check", onNavigate }: ScanResultsCalmProps) {
  const [healthScore, setHealthScore] = useState(0);
  const confidence = 92;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHealthScore(92);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  const insights = [
    {
      id: 1,
      title: "Mild Redness",
      confidence: 78,
      severity: "low",
      description: "Slight inflammation detected in eye corner",
      recommendation: "Monitor for 48 hours",
      visual: "🔴",
    },
    {
      id: 2,
      title: "Normal Tear Production",
      confidence: 92,
      severity: "none",
      description: "Eye moisture levels appear healthy",
      recommendation: "No action needed",
      visual: "✅",
    },
  ];

  const circumference = 2 * Math.PI * 72;

  return (
    <div className="min-h-full gradient-bg pb-24">
      {/* Header with Score */}
      <motion.div 
        className="px-6 pt-16 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Health Score Circle with Ambient Halo */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Ambient Halo Glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-[48px]"
            style={{ 
              background: 'rgba(99, 196, 181, 0.15)',
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Progress circle */}
          <svg className="w-full h-full transform -rotate-90 relative z-10">
            <circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="url(#resultGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ 
                strokeDashoffset: healthScore > 0 ? circumference - (healthScore / 100) * circumference : circumference
              }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
            <defs>
              <linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#63C4B5" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              className="text-white mb-1 font-bold"
              style={{ fontSize: '48px', lineHeight: '56px' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            >
              {healthScore}
            </motion.div>
            <div className="text-white/70 text-sm font-medium">Health Score</div>
          </div>
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 
            className="text-white mb-2 font-bold tracking-tight"
            style={{ fontSize: '24px', lineHeight: '32px' }}
          >
            {scanTitle} Results
          </h2>
          <p className="text-white/70 text-sm font-medium mb-4">
            Scan completed • {new Date().toLocaleDateString()}
          </p>
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[100px] border border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">{confidence}% Confidence</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Insights Cards */}
      <div className="px-6 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 
            className="text-white mb-4 font-bold"
            style={{ fontSize: '20px', lineHeight: '28px' }}
          >
            AI Insights
          </h3>
        </motion.div>

        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
          >
            <div 
              className="p-5 rounded-[24px] border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl flex-shrink-0 border border-white/20"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {insight.visual}
                </div>
                <div className="flex-1">
                  <h4 
                    className="text-white mb-1 font-bold"
                    style={{ fontSize: '16px', lineHeight: '24px' }}
                  >
                    {insight.title}
                  </h4>
                  <p 
                    className="text-white/70 text-sm font-medium"
                    style={{ fontSize: '14px', lineHeight: '20px' }}
                  >
                    {insight.description}
                  </p>
                </div>
                {insight.severity === "none" ? (
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
                )}
              </div>
              
              <div 
                className="px-3 py-2 rounded-[100px] border border-white/20 text-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <span className="text-white/80 font-medium">💡 {insight.recommendation}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-6 mt-8 space-y-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="w-full h-14 button-gradient text-white rounded-[100px] flex items-center justify-center gap-2 font-medium"
          onClick={() => onNavigate("vet-chat")}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Ask a Vet</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            className="h-12 border text-white rounded-[100px] flex items-center justify-center gap-2 font-medium transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              fontSize: '14px',
            }}
            onClick={() => onNavigate("health-check")}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Rescan</span>
          </button>
          
          <button
            className="h-12 border text-white rounded-[100px] flex items-center justify-center gap-2 font-medium transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              fontSize: '14px',
            }}
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
