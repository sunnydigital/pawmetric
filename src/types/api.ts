/**
 * TypeScript types for PawMetric API
 * These types match the backend Pydantic schemas and SQLAlchemy models
 */

// =============================================================================
// Enums
// =============================================================================

export enum ScanType {
  EYE = "EYE",
  EAR = "EAR",
  NOSE = "NOSE",
  DENTAL = "DENTAL",
  SKIN_COAT = "SKIN_COAT",
  NECK_THROAT = "NECK_THROAT",
  BODY_ABDOMEN = "BODY_ABDOMEN",
  LEGS_JOINTS = "LEGS_JOINTS",
  PAWS_NAILS = "PAWS_NAILS",
}

export enum ScanStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum ActivityType {
  MEAL = "MEAL",
  WALK = "WALK",
  PLAY = "PLAY",
  VET_VISIT = "VET_VISIT",
  MEDICATION = "MEDICATION",
  GROOMING = "GROOMING",
  TRAINING = "TRAINING",
  OTHER = "OTHER",
}

// =============================================================================
// User Types
// =============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  email: string;
  password: string;
  name: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
    token_type: string;
  };
}

export interface TokenRefreshResponse {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
  };
}

// =============================================================================
// Pet Types
// =============================================================================

export interface Pet {
  id: string;
  user_id: string;
  name: string;
  breed: string;
  age?: number;
  weight?: number;
  gender?: string;
  birthday?: string;
  photo_url?: string;
  microchip_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PetCreate {
  name: string;
  breed: string;
  age?: number;
  weight?: number;
  gender?: string;
  birthday?: string;
  microchip_id?: string;
}

export interface PetUpdate {
  name?: string;
  breed?: string;
  age?: number;
  weight?: number;
  gender?: string;
  birthday?: string;
  microchip_id?: string;
}

export interface PetResponse {
  success: boolean;
  data: {
    pet: Pet;
  };
}

export interface PetsResponse {
  success: boolean;
  data: {
    pets: Pet[];
  };
}

// =============================================================================
// Health Score Types
// =============================================================================

export interface HealthScore {
  id: string;
  pet_id: string;
  overall_score: number;
  eye_score?: number;
  ear_score?: number;
  nose_score?: number;
  dental_score?: number;
  skin_coat_score?: number;
  neck_throat_score?: number;
  body_score?: number;
  legs_joints_score?: number;
  paws_nails_score?: number;
  last_updated: string;
  created_at: string;
}

export interface HealthScoreResponse {
  success: boolean;
  data: {
    health_score: HealthScore;
  };
}

// =============================================================================
// Health Scan Types
// =============================================================================

export interface HealthScanFindings {
  status: "healthy" | "needs_attention" | "urgent";
  details: string;
  confidence: number;
  analyzed_at?: string;
  [key: string]: any;
}

export interface HealthScan {
  id: string;
  pet_id: string;
  scan_type: ScanType;
  image_url: string;
  status: ScanStatus;
  score?: number;
  findings?: HealthScanFindings;
  notes?: string;
  scanned_at: string;
  created_at: string;
}

export interface HealthScanCreate {
  pet_id: string;
  scan_type: ScanType;
  notes?: string;
}

export interface HealthScanResponse {
  success: boolean;
  data: {
    health_scan: HealthScan;
  };
}

export interface HealthScansResponse {
  success: boolean;
  data: {
    health_scans: HealthScan[];
  };
}

// =============================================================================
// Activity Types
// =============================================================================

export interface Activity {
  id: string;
  pet_id: string;
  type: ActivityType;
  title: string;
  description?: string;
  data?: Record<string, any>;
  timestamp: string;
  created_at: string;
}

export interface ActivityCreate {
  pet_id: string;
  type: ActivityType;
  title: string;
  description?: string;
  data?: Record<string, any>;
  timestamp?: string;
}

export interface ActivityResponse {
  success: boolean;
  data: {
    activity: Activity;
  };
}

export interface ActivitiesResponse {
  success: boolean;
  data: {
    activities: Activity[];
  };
}

// =============================================================================
// Veterinarian Types
// =============================================================================

export interface Veterinarian {
  id: string;
  name: string;
  clinic_name: string;
  specialty?: string[];
  address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude?: number;
  longitude?: number;
  phone: string;
  email?: string;
  website?: string;
  hours?: Record<string, string>;
  rating?: number;
  review_count?: number;
  description?: string;
  accepts_emergencies?: boolean;
  created_at: string;
}

export interface VeterinariansResponse {
  success: boolean;
  data: {
    veterinarians: Veterinarian[];
  };
}

export interface VeterinarianResponse {
  success: boolean;
  data: {
    veterinarian: Veterinarian;
  };
}

// =============================================================================
// Chat Types
// =============================================================================

export interface ChatMessage {
  id: string;
  user_id: string;
  pet_id?: string;
  message: string;
  response: string;
  context?: Record<string, any>;
  created_at: string;
}

export interface ChatMessageCreate {
  message: string;
  pet_id?: string;
  context?: Record<string, any>;
}

export interface ChatResponse {
  success: boolean;
  data: {
    chat_message: ChatMessage;
  };
}

export interface ChatHistoryResponse {
  success: boolean;
  data: {
    messages: ChatMessage[];
  };
}

// =============================================================================
// Analytics Types
// =============================================================================

export interface DashboardStats {
  total_pets: number;
  total_scans: number;
  total_activities: number;
  average_health_score: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}

export interface ActivityStats {
  total_activities: number;
  by_type: Record<ActivityType, number>;
  recent_activities: Activity[];
}

export interface ActivityStatsResponse {
  success: boolean;
  data: ActivityStats;
}

// =============================================================================
// API Error Types
// =============================================================================

export interface APIError {
  success: false;
  message: string;
  detail?: string | any;
}

export type APIResponse<T> = T | APIError;

// =============================================================================
// Utility Types
// =============================================================================

export function isAPIError(response: any): response is APIError {
  return response && response.success === false;
}
