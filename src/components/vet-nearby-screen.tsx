import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  MapPin,
  Star,
  Phone,
  Navigation,
  Clock,
  Crosshair,
  Minus,
  Plus,
  List,
  X
} from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  DirectionsRenderer,
  MarkerClusterer
} from "@react-google-maps/api";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useDarkMode } from "./dark-mode-context";

interface VetNearbyScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

// Vet location data with coordinates
const vetLocations = [
  {
    id: "riverside-vet",
    name: "Riverside Veterinary Hospital",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviewCount: 324,
    distance: 1.2,
    address: "245 Riverside Drive, San Francisco, CA",
    phone: "(415) 555-0123",
    specialties: ["Emergency Care", "Surgery", "Eye Care"],
    availability: "Open Now",
    openStatus: "open",
    position: { lat: 37.7749, lng: -122.4194 }, // San Francisco
  },
  {
    id: "paws-wellness",
    name: "Paws & Wellness Center",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviewCount: 512,
    distance: 2.5,
    address: "1840 Market Street, San Francisco, CA",
    phone: "(415) 555-0189",
    specialties: ["24/7 Emergency", "Cardiology", "Holistic Care"],
    availability: "Open 24/7",
    openStatus: "open",
    position: { lat: 37.7699, lng: -122.4310 },
  },
  {
    id: "urban-pet-clinic",
    name: "Urban Pet Clinic",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviewCount: 189,
    distance: 3.8,
    address: "567 Mission Street, San Francisco, CA",
    phone: "(415) 555-0234",
    specialties: ["Dental Care", "Vaccinations", "Wellness"],
    availability: "Opens at 9:00 AM",
    openStatus: "closed",
    position: { lat: 37.7899, lng: -122.4065 },
  },
  {
    id: "bay-area-animal",
    name: "Bay Area Animal Hospital",
    image: "https://images.unsplash.com/photo-1664649908616-51650c9b28ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMTc2NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviewCount: 276,
    distance: 4.2,
    address: "890 Valencia Street, San Francisco, CA",
    phone: "(415) 555-0345",
    specialties: ["Orthopedics", "Surgery", "Rehab"],
    availability: "Open Now",
    openStatus: "open",
    position: { lat: 37.7599, lng: -122.4210 },
  },
];

const radiusOptions = [1, 5, 10, 25]; // in miles
const MILES_TO_METERS = 1609.34;

// Map container styling
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Default center (San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

// Map styling for dark/light mode
const mapStyles = {
  light: [],
  dark: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
};

export function VetNearbyScreen({ onNavigate }: VetNearbyScreenProps) {
  const { isDarkMode } = useDarkMode();
  const [selectedVet, setSelectedVet] = useState<typeof vetLocations[0] | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchRadius, setSearchRadius] = useState(10); // miles
  const [showDirections, setShowDirections] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Load Google Maps
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE",
    libraries: ["places", "geometry"],
  });

  // Get user's current location
  const getUserLocation = useCallback(() => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          if (map) {
            map.panTo(pos);
            map.setZoom(13);
          }
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          // Use default location if geolocation fails
          setUserLocation(defaultCenter);
        }
      );
    } else {
      setIsLoadingLocation(false);
      setUserLocation(defaultCenter);
    }
  }, [map]);

  // Get directions to selected vet
  const getDirections = useCallback(async (vet: typeof vetLocations[0]) => {
    if (!userLocation) return;

    const directionsService = new google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: userLocation,
        destination: vet.position,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setShowDirections(true);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }, [userLocation]);

  // Filter vets by radius
  const filteredVets = vetLocations.filter((vet) =>
    vet.distance <= searchRadius
  );

  // Handle map load
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // Handle map unmount
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Get user location on mount
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${isDarkMode ? 'gradient-bg-light' : 'gradient-bg'} transition-colors duration-500`}></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="px-6 pt-16 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-white">Nearby Vets</h1>
            <div className="flex gap-2">
              <Button
                onClick={getUserLocation}
                disabled={isLoadingLocation}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0 rounded-full h-10 w-10 p-0"
              >
                <Crosshair className={`w-5 h-5 ${isLoadingLocation ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Radius Filter */}
          <div className="bg-white/20 backdrop-blur-md rounded-full p-1 flex items-center gap-2">
            <Button
              onClick={() => setSearchRadius(Math.max(1, searchRadius - 5))}
              className="bg-transparent hover:bg-white/20 text-white border-0 rounded-full h-8 w-8 p-0"
              disabled={searchRadius <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="flex-1 text-center">
              <span className="text-white text-sm font-medium">
                Within {searchRadius} mile{searchRadius !== 1 ? 's' : ''}
              </span>
            </div>
            <Button
              onClick={() => setSearchRadius(Math.min(25, searchRadius + 5))}
              className="bg-transparent hover:bg-white/20 text-white border-0 rounded-full h-8 w-8 p-0"
              disabled={searchRadius >= 25}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Map View */}
        <div className="relative flex-1 mx-6 mb-4 rounded-[24px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || defaultCenter}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              styles: isDarkMode ? mapStyles.dark : mapStyles.light,
              disableDefaultUI: true,
              zoomControl: true,
              fullscreenControl: false,
            }}
          >
            {/* User location marker */}
            {userLocation && (
              <>
                <Marker
                  position={userLocation}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#2563EB",
                    fillOpacity: 1,
                    strokeColor: "#FFFFFF",
                    strokeWeight: 2,
                  }}
                />

                {/* Search radius circle */}
                <Circle
                  center={userLocation}
                  radius={searchRadius * MILES_TO_METERS}
                  options={{
                    fillColor: "#2563EB",
                    fillOpacity: 0.1,
                    strokeColor: "#2563EB",
                    strokeOpacity: 0.3,
                    strokeWeight: 2,
                  }}
                />
              </>
            )}

            {/* Vet location markers with clustering */}
            <MarkerClusterer>
              {(clusterer) => (
                <>
                  {filteredVets.map((vet) => (
                    <Marker
                      key={vet.id}
                      position={vet.position}
                      clusterer={clusterer}
                      onClick={() => setSelectedVet(vet)}
                      icon={{
                        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="18" fill="${vet.openStatus === 'open' ? '#34D399' : '#9CA3AF'}" stroke="white" stroke-width="3"/>
                            <path d="M20 12L20 28M12 20L28 20" stroke="white" stroke-width="3" stroke-linecap="round"/>
                          </svg>
                        `),
                        scaledSize: new google.maps.Size(40, 40),
                        anchor: new google.maps.Point(20, 20),
                      }}
                    />
                  ))}
                </>
              )}
            </MarkerClusterer>

            {/* Directions */}
            {showDirections && directionsResponse && (
              <DirectionsRenderer
                directions={directionsResponse}
                options={{
                  polylineOptions: {
                    strokeColor: "#2563EB",
                    strokeWeight: 5,
                  },
                  suppressMarkers: true,
                }}
              />
            )}
          </GoogleMap>

          {/* Map Info Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
            <p className="text-sm font-medium text-gray-900">
              {filteredVets.length} vet{filteredVets.length !== 1 ? 's' : ''} nearby
            </p>
          </div>

          {/* Clear Directions Button */}
          {showDirections && (
            <div className="absolute top-4 right-4">
              <Button
                onClick={() => {
                  setShowDirections(false);
                  setDirectionsResponse(null);
                }}
                className="bg-white/90 backdrop-blur-md hover:bg-white text-gray-900 border-0 rounded-full h-10 w-10 p-0 shadow-lg"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Vet List - Scrollable */}
        <div className="px-6 pb-6 max-h-[280px] overflow-y-auto space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white flex items-center gap-2">
              <List className="w-5 h-5" />
              Nearby Locations
            </h3>
          </div>

          {filteredVets.length === 0 ? (
            <Card className="p-6 bg-white/20 backdrop-blur-md border-0 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <p className="text-white text-center">
                No vets found within {searchRadius} mile{searchRadius !== 1 ? 's' : ''}. Try increasing the search radius.
              </p>
            </Card>
          ) : (
            filteredVets.map((vet) => (
              <Card
                key={vet.id}
                className={`overflow-hidden border-2 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all cursor-pointer bg-white/20 backdrop-blur-md ${
                  selectedVet?.id === vet.id ? 'border-white' : 'border-transparent'
                }`}
                onClick={() => {
                  setSelectedVet(vet);
                  if (map) {
                    map.panTo(vet.position);
                    map.setZoom(15);
                  }
                }}
              >
                <div className="flex gap-3 p-3">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-[12px] overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={vet.image}
                      alt={vet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-white text-sm font-semibold leading-tight">{vet.name}</h4>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                        <span className="text-xs text-white">{vet.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-white/70" />
                      <span className="text-xs text-white/80">{vet.distance} mi away</span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <Clock className={`w-3 h-3 ${vet.openStatus === "open" ? "text-[#34D399]" : "text-white/70"}`} />
                      <span className={`text-xs ${vet.openStatus === "open" ? "text-[#34D399]" : "text-white/70"}`}>
                        {vet.availability}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`tel:${vet.phone}`, '_self');
                        }}
                        className="flex-1 bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white border-0 rounded-full h-7 text-xs"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(vet);
                        }}
                        className="flex-1 bg-gradient-to-br from-[#2563EB] to-[#34D399] hover:from-[#1D4ED8] hover:to-[#10B981] text-white border-0 rounded-full h-7 text-xs"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Route
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
