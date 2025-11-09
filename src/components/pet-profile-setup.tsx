import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";
import { PetScopeLogo } from "./petscope-logo";

interface PetProfileSetupProps {
  onComplete: () => void;
}

const petTypes = [
  { id: "dog", label: "Dog", icon: "🐕" },
  { id: "cat", label: "Cat", icon: "🐈" },
  { id: "other", label: "Other", icon: "🐾" },
];

const popularBreeds = [
  "Golden Retriever",
  "Labrador Retriever",
  "German Shepherd",
  "Bulldog",
  "Poodle",
  "Beagle",
  "Mixed Breed",
  "Other",
];

const healthFocusAreas = [
  { id: "dental", label: "Dental Health", icon: "🦷" },
  { id: "mobility", label: "Mobility & Joints", icon: "🦴" },
  { id: "skin", label: "Skin & Coat", icon: "✨" },
  { id: "general", label: "General Wellness", icon: "❤️" },
];

export function PetProfileSetup({ onComplete }: PetProfileSetupProps) {
  const [step, setStep] = useState(1);
  const [petType, setPetType] = useState("dog");
  const [breed, setBreed] = useState("");
  const [name, setName] = useState("Max");
  const [age, setAge] = useState("5");
  const [weight, setWeight] = useState("65");
  const [healthFocus, setHealthFocus] = useState<string[]>(["general"]);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleHealthFocus = (focus: string) => {
    setHealthFocus((prev) =>
      prev.includes(focus)
        ? prev.filter((f) => f !== focus)
        : [...prev, focus]
    );
  };

  const canProceed = () => {
    if (step === 1) return petType !== "";
    if (step === 2) return breed !== "";
    if (step === 3) return name !== "" && age !== "" && weight !== "";
    if (step === 4) return healthFocus.length > 0;
    return true;
  };

  if (showSuccess) {
    return (
      <div className="h-full gradient-bg flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-32 h-32 mx-auto mb-8 rounded-[24px] glass-card border-2 border-white/30 flex items-center justify-center"
          >
            <Check className="w-16 h-16 text-white" />
          </motion.div>
          <h1 className="text-white mb-4 font-bold tracking-tight">{name}'s profile is ready</h1>
          <p className="text-white/80 text-lg font-medium">Let's start your first AI Health Check</p>
          <motion.div
            className="mt-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-white mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full gradient-bg flex flex-col">
      {/* Logo - 72px from top */}
      <div className="px-6 flex justify-center" style={{ paddingTop: '72px' }}>
        <PetScopeLogo variant="vertical" className="h-24 w-auto" />
      </div>

      {/* Header with Progress */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/15 transition-all disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="text-white text-sm">
            Step {step} of {totalSteps}
          </div>
          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step 1: Pet Type */}
            {step === 1 && (
              <div>
                <h2 className="text-white mb-2">What type of pet do you have?</h2>
                <p className="text-white/70 mb-6">Select your pet type to get started</p>
                <div className="grid grid-cols-3 gap-4">
                  {petTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setPetType(type.id)}
                      className={`p-6 rounded-[24px] border-2 transition-all ${
                        petType === type.id
                          ? "bg-white/20 backdrop-blur-xl border-white/40"
                          : "bg-white/10 backdrop-blur-sm border-white/20"
                      }`}
                    >
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <div className="text-white text-sm">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Breed */}
            {step === 2 && (
              <div>
                <h2 className="text-white mb-2">What's the breed?</h2>
                <p className="text-white/70 mb-6">Help us provide better health insights</p>
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Search or enter breed..."
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="h-14 bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/50 rounded-[20px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {popularBreeds.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBreed(b)}
                        className={`p-4 rounded-[20px] border transition-all text-sm ${
                          breed === b
                            ? "bg-white/20 backdrop-blur-xl border-white/40 text-white"
                            : "bg-white/10 backdrop-blur-sm border-white/20 text-white/80"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Age & Weight */}
            {step === 3 && (
              <div>
                <h2 className="text-white mb-2">Tell us about {name}</h2>
                <p className="text-white/70 mb-6">Basic information for health tracking</p>
                <div className="space-y-5">
                  <div>
                    <Label className="text-white mb-2 block">Pet Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-14 bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/50 rounded-[20px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white mb-2 block">Age (years)</Label>
                      <Input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="h-14 bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/50 rounded-[20px]"
                      />
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Weight (lbs)</Label>
                      <Input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="h-14 bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/50 rounded-[20px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Health Focus */}
            {step === 4 && (
              <div>
                <h2 className="text-white mb-2">Health focus areas</h2>
                <p className="text-white/70 mb-6">Select areas you'd like to monitor (choose all that apply)</p>
                <div className="grid grid-cols-2 gap-4">
                  {healthFocusAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => toggleHealthFocus(area.id)}
                      className={`p-6 rounded-[24px] border-2 transition-all ${
                        healthFocus.includes(area.id)
                          ? "bg-white/20 backdrop-blur-xl border-white/40"
                          : "bg-white/10 backdrop-blur-sm border-white/20"
                      }`}
                    >
                      <div className="text-3xl mb-3">{area.icon}</div>
                      <div className="text-white text-sm leading-tight">{area.label}</div>
                      {healthFocus.includes(area.id) && (
                        <div className="mt-3">
                          <Check className="w-5 h-5 text-white mx-auto" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Button */}
      <div className="p-6 pt-4">
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full h-14 button-gradient text-white hover:bg-white/90 rounded-[100px] text-base disabled:opacity-50 font-medium transition-all hover:-translate-y-1"
        >
          {step === totalSteps ? (
            "Complete Setup"
          ) : (
            <>
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
