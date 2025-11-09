import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useDarkMode } from "./dark-mode-context";

interface VetDirectoryScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

const vetLocations = [
  {
    id: "riverside-vet",
    name: "Riverside Veterinary Hospital",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviewCount: 324,
    distance: "1.2 miles",
    address: "245 Riverside Drive, San Francisco, CA",
    specialties: ["Emergency Care", "Surgery", "Eye Care"],
    availability: "Open Now",
    openStatus: "open",
  },
  {
    id: "paws-wellness",
    name: "Paws & Wellness Center",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviewCount: 512,
    distance: "2.5 miles",
    address: "1840 Market Street, San Francisco, CA",
    specialties: ["24/7 Emergency", "Cardiology", "Holistic Care"],
    availability: "Open 24/7",
    openStatus: "open",
  },
  {
    id: "urban-pet-clinic",
    name: "Urban Pet Clinic",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviewCount: 189,
    distance: "3.8 miles",
    address: "567 Mission Street, San Francisco, CA",
    specialties: ["Dental Care", "Vaccinations", "Wellness"],
    availability: "Opens at 9:00 AM",
    openStatus: "closed",
  },
  {
    id: "bay-area-animal",
    name: "Bay Area Animal Hospital",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviewCount: 276,
    distance: "4.2 miles",
    address: "890 Valencia Street, San Francisco, CA",
    specialties: ["Orthopedics", "Surgery", "Rehab"],
    availability: "Open Now",
    openStatus: "open",
  },
];

export function VetDirectoryScreen({ onNavigate }: VetDirectoryScreenProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen pb-6 relative overflow-hidden">
      {/* Tri-tone Gradient Background - same as home screen */}
      <div className={`absolute inset-0 ${isDarkMode ? 'gradient-bg-light' : 'gradient-bg'} transition-colors duration-500`}></div>

      <div className="relative z-10">
      {/* Header with Search */}
      <div className="px-6 pt-16 pb-8">
        <h1 className="text-white mb-4">Find a Vet</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <Input
            placeholder="Search by name, specialty..."
            className="pl-12 pr-4 h-12 bg-white border-0 rounded-full shadow-lg focus:ring-2 focus:ring-white/50"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mt-4">
          <Button className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full h-10">
            <MapPin className="w-4 h-4 mr-2" />
            Nearby
          </Button>
          <Button
            onClick={() => onNavigate("vet-filters")}
            className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full h-10"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-4 mb-6">
        <Card className="p-4 bg-white/20 backdrop-blur-md border-0 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-3 divide-x divide-white/30">
            <div className="text-center">
              <div className="text-2xl text-white mb-1">{vetLocations.length}</div>
              <div className="text-xs text-white/80">Nearby</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-white mb-1">3</div>
              <div className="text-xs text-white/80">Open Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-white mb-1">4.8</div>
              <div className="text-xs text-white/80">Avg Rating</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Vet Locations List */}
      <div className="px-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white">Recommended for You</h3>
          <button className="text-sm text-white/90 hover:text-white transition-colors">View Map</button>
        </div>

        {vetLocations.map((vet) => (
          <Card
            key={vet.id}
            onClick={() => onNavigate("vet-location", { locationId: vet.id })}
            className="overflow-hidden border-0 rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all cursor-pointer bg-white/20 backdrop-blur-md"
          >
            <div className="flex gap-4 p-4">
              {/* Image */}
              <div className="relative w-24 h-24 rounded-[16px] overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={vet.image}
                  alt={vet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-white leading-tight">{vet.name}</h4>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-sm text-white">{vet.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-sm text-white/80">{vet.distance} • {vet.address}</span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Clock className={`w-3.5 h-3.5 ${vet.openStatus === "open" ? "text-[#34D399]" : "text-white/70"}`} />
                  <span className={`text-xs ${vet.openStatus === "open" ? "text-[#34D399]" : "text-white/70"}`}>
                    {vet.availability}
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5">
                  {vet.specialties.slice(0, 3).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-white/30 backdrop-blur-sm text-white text-xs rounded-full border border-white/40"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center border-t border-white/30">
              <button className="flex-1 py-3 text-sm text-white hover:bg-white/20 transition-all text-center">
                Call
              </button>
              <div className="w-px h-6 bg-white/30" />
              <button className="flex-1 py-3 text-sm text-white hover:bg-white/20 transition-all text-center">
                Directions
              </button>
              <div className="w-px h-6 bg-white/30" />
              <button className="flex-1 py-3 text-sm text-white hover:bg-white/20 transition-all text-center">
                Book
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 right-6 z-50">
        <Button
          onClick={() => onNavigate("vet-filters")}
          className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#34D399] hover:from-[#1D4ED8] hover:to-[#10B981] rounded-full shadow-[0_8px_24px_rgba(37,99,235,0.4)] hover:scale-110 transition-all"
        >
          <Filter className="w-6 h-6 text-white" />
        </Button>
      </div>
      </div>
    </div>
  );
}
