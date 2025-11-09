import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PetScopeLogo } from "./petscope-logo";
import { useDarkMode } from "./dark-mode-context";
import { Moon, Sun } from "lucide-react";

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: "See your dog's wellbeing — at a glance.",
    description: "AI insights that understand every heartbeat, every wag.",
  },
];

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`h-full ${isDarkMode ? 'gradient-bg-light' : 'gradient-bg'} relative overflow-hidden transition-colors duration-500`}>
      {/* Slow-moving gradient background - handled by gradient-bg class */}
      
      {/* Subtle ambient circles */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-white blur-sm animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full border border-white blur-sm animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Dark Mode Toggle */}
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={toggleDarkMode}
            className={`w-10 h-10 rounded-full ${
              isDarkMode 
                ? 'bg-gray-800/20 border border-gray-700/30' 
                : 'bg-white/10 border border-white/20'
            } backdrop-blur-xl flex items-center justify-center transition-all hover:scale-110`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-800" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Skip Button */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={onComplete}
            className={`${
              isDarkMode 
                ? 'text-gray-700/60 hover:text-gray-700' 
                : 'text-white/60 hover:text-white'
            } transition-all text-sm px-4 py-2 font-medium`}
          >
            Skip
          </button>
        </div>

        {/* Content Container - centered at ~40% of screen height */}
        <div className="absolute" style={{ top: '40%', transform: 'translateY(-50%)', width: '100%' }}>
          {/* Logo centered at ~40% screen height with shimmer animation */}
          <div className="px-6 flex justify-center mb-12">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PetScopeLogo variant="vertical" className="h-32 w-auto" />
              
              {/* Animated shimmer sweep across telescope lens */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  pointerEvents: 'none'
                }}
              />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center px-6"
            >
              {/* Headline - Inter Rounded Bold 28pt */}
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className={`${isDarkMode ? 'text-gray-900' : 'text-white'} mb-6 leading-tight tracking-tight transition-colors`}
                style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 700 }}
              >
                {slides[currentSlide].title}
              </motion.h1>

              {/* Subline - Inter Medium 16pt */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className={`${isDarkMode ? 'text-gray-700/80' : 'text-white/80'} leading-relaxed max-w-xs mx-auto transition-colors`}
                style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}
              >
                {slides[currentSlide].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section - CTA Button (absolutely positioned at bottom) */}
        <div className="absolute bottom-0 left-0 right-0 px-6" style={{ paddingBottom: '64px' }}>
          {/* CTA Button: 56px tall pill, 100px radius, gradient */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            onClick={onComplete}
            className="w-full button-gradient text-white rounded-[100px] flex items-center justify-center gap-2 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              height: '56px',
              fontSize: '16px', 
              lineHeight: '24px',
              fontWeight: 700,
            }}
          >
            <span>Continue →</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
