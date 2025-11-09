import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { 
  ChevronLeft, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Navigation, 
  Calendar,
  Shield,
  Stethoscope,
  Activity,
  Heart,
  Eye
} from "lucide-react";
import { useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useDarkMode } from "./dark-mode-context";

interface VetLocationScreenProps {
  onNavigate: (screen: string) => void;
  locationId?: string;
}

// Mock data for different vet locations
const vetLocations = {
  "riverside-vet": {
    name: "Riverside Veterinary Hospital",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviewCount: 324,
    distance: "1.2 miles",
    address: "245 Riverside Drive, San Francisco, CA 94107",
    phone: "(415) 555-0123",
    hours: "Mon-Fri: 8:00 AM - 7:00 PM\nSat-Sun: 9:00 AM - 5:00 PM",
    description: "Riverside Veterinary Hospital is a full-service animal hospital providing comprehensive healthcare services for dogs and cats. Our experienced veterinarians and staff are committed to providing the highest quality medical care with compassion and understanding.",
    services: [
      { icon: Stethoscope, name: "Wellness Exams" },
      { icon: Activity, name: "Emergency Care" },
      { icon: Shield, name: "Vaccinations" },
      { icon: Heart, name: "Surgery" },
      { icon: Eye, name: "Eye Care" },
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah Mitchell",
        avatar: "SM",
        rating: 5,
        date: "2 days ago",
        text: "Dr. Johnson and her team are absolutely wonderful! They took such great care of my golden retriever Max during his dental procedure. The facility is spotless and modern, and they clearly explained every step of the process. Highly recommend!",
      },
      {
        id: 2,
        author: "Michael Chen",
        avatar: "MC",
        rating: 5,
        date: "1 week ago",
        text: "Best vet clinic in SF! They got us in same-day when our pup had an emergency. The staff is incredibly caring and professional. Dr. Patel took the time to answer all our questions and followed up the next day to check on our dog.",
      },
      {
        id: 3,
        author: "Emily Rodriguez",
        avatar: "ER",
        rating: 4,
        date: "2 weeks ago",
        text: "Great experience overall. Wait time was a bit long, but the quality of care made up for it. Dr. Johnson was thorough and gentle with my nervous rescue pup. The staff provided detailed aftercare instructions.",
      },
      {
        id: 4,
        author: "David Thompson",
        avatar: "DT",
        rating: 5,
        date: "3 weeks ago",
        text: "We've been bringing our dogs here for 3 years now. Consistently excellent service, fair pricing, and genuine care for animals. The online appointment system is convenient and they send helpful reminders.",
      },
    ],
  },
  "paws-wellness": {
    name: "Paws & Wellness Center",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviewCount: 512,
    distance: "2.5 miles",
    address: "1840 Market Street, San Francisco, CA 94102",
    phone: "(415) 555-0189",
    hours: "Mon-Sun: 7:00 AM - 9:00 PM\n24/7 Emergency Line Available",
    description: "Paws & Wellness Center combines traditional veterinary medicine with holistic care approaches. Our integrative approach ensures your pet receives comprehensive, personalized treatment in a calming, spa-like environment.",
    services: [
      { icon: Stethoscope, name: "Wellness Exams" },
      { icon: Activity, name: "24/7 Emergency" },
      { icon: Shield, name: "Preventive Care" },
      { icon: Heart, name: "Cardiology" },
      { icon: Eye, name: "Ophthalmology" },
    ],
    reviews: [
      {
        id: 1,
        author: "Jessica Park",
        avatar: "JP",
        rating: 5,
        date: "3 days ago",
        text: "This place is amazing! The holistic approach really sets them apart. Dr. Williams took time to understand our dog's anxiety issues and created a comprehensive care plan. The results have been incredible!",
      },
      {
        id: 2,
        author: "Robert Kim",
        avatar: "RK",
        rating: 5,
        date: "5 days ago",
        text: "Called their emergency line at 2 AM when our puppy ate something she shouldn't have. They were calm, professional, and got us in immediately. Dr. Lee saved the day! Forever grateful.",
      },
      {
        id: 3,
        author: "Amanda Foster",
        avatar: "AF",
        rating: 5,
        date: "1 week ago",
        text: "The most caring vet staff I've ever encountered. They remember my dog's name and always greet us warmly. The facility is beautiful and calming. Worth every penny!",
      },
    ],
  },
};

export function VetLocationScreen({ onNavigate, locationId = "riverside-vet" }: VetLocationScreenProps) {
  const location = vetLocations[locationId as keyof typeof vetLocations] || vetLocations["riverside-vet"];
  const { isDarkMode } = useDarkMode();

  // Scroll to top when component loads
  useEffect(() => {
    const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, []);

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      {/* Tri-tone Gradient Background - same as home screen */}
      <div className={`absolute inset-0 ${isDarkMode ? 'gradient-bg-light' : 'gradient-bg'} transition-colors duration-500`}></div>

      <div className="relative z-10">
      {/* Header Image */}
      <div className="relative h-64">
        <ImageWithFallback
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Location Name Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-white mb-2">{location.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="text-white">{location.rating}</span>
              <span className="text-white/80 text-sm">({location.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-white/90 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location.distance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 -mt-6 mb-6 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          <Button 
            onClick={() => window.open(`tel:${location.phone}`, '_self')}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0 rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] h-14 flex flex-col gap-1"
          >
            <Phone className="w-5 h-5" />
            <span className="text-xs">Call</span>
          </Button>
          <Button 
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(location.address)}`, '_blank')}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0 rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] h-14 flex flex-col gap-1"
          >
            <Navigation className="w-5 h-5" />
            <span className="text-xs">Directions</span>
          </Button>
          <Button 
            onClick={() => window.open(`tel:${location.phone}`, '_self')}
            className="bg-gradient-to-br from-[#2563EB] to-[#34D399] hover:from-[#1D4ED8] hover:to-[#10B981] text-white border-0 rounded-[16px] shadow-[0_4px_12px_rgba(37,99,235,0.3)] h-14 flex flex-col gap-1"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Book</span>
          </Button>
        </div>
      </div>

      {/* Location Details */}
      <div className="px-6 space-y-6">
        {/* About Section */}
        <Card className="p-5 border-0 rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white/20 backdrop-blur-md">
          <h3 className="text-white mb-3">About</h3>
          <p className="text-sm text-white/80 leading-relaxed">{location.description}</p>
        </Card>

        {/* Contact Info */}
        <Card className="p-5 border-0 rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white/20 backdrop-blur-md">
          <h3 className="text-white mb-4">Contact & Hours</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/40">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-1">Address</h4>
                <p className="text-sm text-white/80">{location.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/40">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-1">Phone</h4>
                <p className="text-sm text-white/90">{location.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/40">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-1">Hours</h4>
                <p className="text-sm text-white/80 whitespace-pre-line">{location.hours}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Services */}
        <Card className="p-5 border-0 rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white/20 backdrop-blur-md">
          <h3 className="text-white mb-4">Services Offered</h3>
          <div className="grid grid-cols-3 gap-3">
            {location.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-3 rounded-[16px] bg-white/30 backdrop-blur-sm border border-white/40"
                >
                  <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-white text-center leading-tight">{service.name}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-white">Reviews</h3>
            <Button
              variant="ghost"
              className="text-white/90 hover:text-white h-auto p-0 hover:bg-transparent"
            >
              See all ({location.reviewCount})
            </Button>
          </div>

          <div className="space-y-3">
            {location.reviews.map((review) => (
              <Card key={review.id} className="p-5 border-0 rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white/20 backdrop-blur-md">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#34D399] flex items-center justify-center text-white flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-white">{review.author}</h4>
                      <span className="text-xs text-white/70 whitespace-nowrap">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? "text-[#F59E0B] fill-[#F59E0B]"
                              : "text-white/30 fill-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <Button className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0 rounded-[16px] h-12 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          Write a Review
        </Button>
      </div>
      </div>
    </div>
  );
}
