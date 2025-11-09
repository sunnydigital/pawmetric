import { Star, MapPin, Clock, Stethoscope, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface VetFiltersScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

const distanceOptions = [
  { value: "1", label: "Within 1 mile" },
  { value: "5", label: "Within 5 miles" },
  { value: "10", label: "Within 10 miles" },
  { value: "25", label: "Within 25 miles" },
];

const availabilityOptions = [
  { value: "open-now", label: "Open Now" },
  { value: "24-7", label: "24/7 Emergency" },
  { value: "weekend", label: "Open Weekends" },
];

const specialtyOptions = [
  { value: "emergency", label: "Emergency Care", icon: "🚨" },
  { value: "surgery", label: "Surgery", icon: "🏥" },
  { value: "dental", label: "Dental Care", icon: "🦷" },
  { value: "cardiology", label: "Cardiology", icon: "❤️" },
  { value: "orthopedics", label: "Orthopedics", icon: "🦴" },
  { value: "ophthalmology", label: "Eye Care", icon: "👁️" },
  { value: "wellness", label: "Wellness", icon: "✨" },
  { value: "vaccinations", label: "Vaccinations", icon: "💉" },
];

export function VetFiltersScreen({ onNavigate }: VetFiltersScreenProps) {
  const [selectedDistance, setSelectedDistance] = useState("10");
  const [minRating, setMinRating] = useState(0);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const toggleAvailability = (value: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSpecialty = (value: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleClearAll = () => {
    setSelectedDistance("10");
    setMinRating(0);
    setSelectedAvailability([]);
    setSelectedSpecialties([]);
  };

  const handleApply = () => {
    // Apply filters logic here
    onNavigate("vet-directory");
  };

  return (
    <div className="min-h-screen pb-6 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-bg"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 pt-16 pb-6">
          <h1 className="text-white mb-2">Filters</h1>
          <p className="text-white/70">Find the perfect vet for your pet</p>
        </div>

        {/* Filter Content */}
        <div className="px-6 space-y-5">
          {/* Distance */}
          <div>
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              Distance
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {distanceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDistance(option.value)}
                  className={`p-3 rounded-[16px] border-2 transition-all ${
                    selectedDistance === option.value
                      ? "border-white bg-white/20"
                      : "border-white/20 bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium text-xs">
                      {option.label}
                    </span>
                    {selectedDistance === option.value && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
              <Star className="w-4 h-4" />
              Minimum Rating
            </h3>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex-1 p-2 rounded-[12px] border-2 transition-all ${
                    minRating === rating
                      ? "border-white bg-white/20"
                      : "border-white/20 bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {rating === 0 ? (
                      <span className="text-white font-medium text-xs">Any</span>
                    ) : (
                      <>
                        <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                        <span className="text-white font-medium text-xs">{rating}+</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              Availability
            </h3>
            <div className="flex flex-col gap-2">
              {availabilityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleAvailability(option.value)}
                  className={`w-full p-3 rounded-[16px] border-2 transition-all ${
                    selectedAvailability.includes(option.value)
                      ? "border-white bg-white/20"
                      : "border-white/20 bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium text-sm">{option.label}</span>
                    {selectedAvailability.includes(option.value) && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
              <Stethoscope className="w-4 h-4" />
              Specialties
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {specialtyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleSpecialty(option.value)}
                  className={`p-3 rounded-[16px] border-2 transition-all ${
                    selectedSpecialties.includes(option.value)
                      ? "border-white bg-white/20"
                      : "border-white/20 bg-white/10"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xl">{option.icon}</span>
                    <span className="text-white font-medium text-xs text-center leading-tight">
                      {option.label}
                    </span>
                    {selectedSpecialties.includes(option.value) && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleClearAll}
                className="flex-1 h-12 rounded-[100px] border-2 border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-all backdrop-blur-xl"
              >
                Clear All
              </button>
              <button
                onClick={handleApply}
                className="flex-1 h-12 rounded-[100px] button-gradient text-white font-medium text-sm shadow-lg transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
