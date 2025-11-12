/**
 * PawMetric API Client
 * Handles all HTTP requests to the backend API
 */

import type {
  AuthResponse,
  TokenRefreshResponse,
  UserCreate,
  UserLogin,
  Pet,
  PetCreate,
  PetUpdate,
  PetResponse,
  PetsResponse,
  HealthScore,
  HealthScoreResponse,
  HealthScan,
  HealthScanCreate,
  HealthScanResponse,
  HealthScansResponse,
  Activity,
  ActivityCreate,
  ActivityResponse,
  ActivitiesResponse,
  Veterinarian,
  VeterinariansResponse,
  VeterinarianResponse,
  ChatMessageCreate,
  ChatResponse,
  ChatHistoryResponse,
  DashboardStatsResponse,
  ActivityStatsResponse,
  APIError,
  ScanType,
  ActivityType,
} from "../types/api";

// =============================================================================
// Configuration
// =============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_VERSION = "/api/v1";
const API_URL = `${API_BASE_URL}${API_VERSION}`;

// =============================================================================
// Storage Keys
// =============================================================================

const STORAGE_KEYS = {
  ACCESS_TOKEN: "pawmetric_access_token",
  REFRESH_TOKEN: "pawmetric_refresh_token",
  USER: "pawmetric_user",
} as const;

// =============================================================================
// Token Management
// =============================================================================

export const tokenManager = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  clearTokens: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  setUser: (user: any): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): any => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
};

// =============================================================================
// HTTP Client
// =============================================================================

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = tokenManager.getAccessToken();

    const headers: HeadersInit = {
      ...(options.headers || {}),
    };

    // Add Authorization header if token exists (unless it's multipart/form-data)
    if (token && !(options.body instanceof FormData)) {
      headers["Authorization"] = `Bearer ${token}`;
    } else if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Add Content-Type header for JSON requests
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 Unauthorized (token expired)
      if (response.status === 401) {
        // Try to refresh token
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the request with new token
          const newToken = tokenManager.getAccessToken();
          if (newToken) {
            headers["Authorization"] = `Bearer ${newToken}`;
            const retryResponse = await fetch(url, { ...config, headers });
            if (!retryResponse.ok) {
              const error: APIError = await retryResponse.json();
              throw error;
            }
            return await retryResponse.json();
          }
        }
        // If refresh failed, clear tokens and throw error
        tokenManager.clearTokens();
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        const error: APIError = await response.json();
        throw error;
      }

      return await response.json();
    } catch (error: any) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) return false;

      const data: TokenRefreshResponse = await response.json();
      if (data.success) {
        tokenManager.setAccessToken(data.data.access_token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // =============================================================================
  // Authentication
  // =============================================================================

  async register(userData: UserCreate): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.success) {
      tokenManager.setAccessToken(response.data.access_token);
      tokenManager.setRefreshToken(response.data.refresh_token);
      tokenManager.setUser(response.data.user);
    }

    return response;
  }

  async login(credentials: UserLogin): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.success) {
      tokenManager.setAccessToken(response.data.access_token);
      tokenManager.setRefreshToken(response.data.refresh_token);
      tokenManager.setUser(response.data.user);
    }

    return response;
  }

  async logout(): Promise<void> {
    const refreshToken = tokenManager.getRefreshToken();
    if (refreshToken) {
      try {
        await this.request("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    tokenManager.clearTokens();
  }

  // =============================================================================
  // Pets
  // =============================================================================

  async createPet(petData: PetCreate): Promise<PetResponse> {
    return await this.request<PetResponse>("/pets", {
      method: "POST",
      body: JSON.stringify(petData),
    });
  }

  async getPets(): Promise<PetsResponse> {
    return await this.request<PetsResponse>("/pets");
  }

  async getPet(petId: string): Promise<PetResponse> {
    return await this.request<PetResponse>(`/pets/${petId}`);
  }

  async updatePet(petId: string, petData: PetUpdate): Promise<PetResponse> {
    return await this.request<PetResponse>(`/pets/${petId}`, {
      method: "PUT",
      body: JSON.stringify(petData),
    });
  }

  async deletePet(petId: string): Promise<{ success: boolean; message: string }> {
    return await this.request(`/pets/${petId}`, {
      method: "DELETE",
    });
  }

  async uploadPetPhoto(petId: string, photo: File): Promise<PetResponse> {
    const formData = new FormData();
    formData.append("photo", photo);

    return await this.request<PetResponse>(`/pets/${petId}/photo`, {
      method: "POST",
      body: formData,
    });
  }

  // =============================================================================
  // Health Scans
  // =============================================================================

  async createHealthScan(
    petId: string,
    scanType: ScanType,
    image: File,
    notes?: string
  ): Promise<HealthScanResponse> {
    const formData = new FormData();
    formData.append("pet_id", petId);
    formData.append("scan_type", scanType);
    formData.append("image", image);
    if (notes) formData.append("notes", notes);

    return await this.request<HealthScanResponse>("/health-scans", {
      method: "POST",
      body: formData,
    });
  }

  async getHealthScans(
    petId: string,
    scanType?: ScanType,
    limit?: number
  ): Promise<HealthScansResponse> {
    const params = new URLSearchParams();
    if (scanType) params.append("scan_type", scanType);
    if (limit) params.append("limit", limit.toString());

    const queryString = params.toString();
    const endpoint = `/health-scans/pet/${petId}${queryString ? `?${queryString}` : ""}`;

    return await this.request<HealthScansResponse>(endpoint);
  }

  async getHealthScore(petId: string): Promise<HealthScoreResponse> {
    return await this.request<HealthScoreResponse>(`/health-scans/pet/${petId}/score`);
  }

  async getHealthScan(scanId: string): Promise<HealthScanResponse> {
    return await this.request<HealthScanResponse>(`/health-scans/${scanId}`);
  }

  // =============================================================================
  // Activities
  // =============================================================================

  async createActivity(activityData: ActivityCreate): Promise<ActivityResponse> {
    return await this.request<ActivityResponse>("/activities", {
      method: "POST",
      body: JSON.stringify(activityData),
    });
  }

  async getActivities(
    petId: string,
    activityType?: ActivityType,
    limit?: number
  ): Promise<ActivitiesResponse> {
    const params = new URLSearchParams();
    if (activityType) params.append("type", activityType);
    if (limit) params.append("limit", limit.toString());

    const queryString = params.toString();
    const endpoint = `/activities/pet/${petId}${queryString ? `?${queryString}` : ""}`;

    return await this.request<ActivitiesResponse>(endpoint);
  }

  async getActivity(activityId: string): Promise<ActivityResponse> {
    return await this.request<ActivityResponse>(`/activities/${activityId}`);
  }

  async deleteActivity(activityId: string): Promise<{ success: boolean; message: string }> {
    return await this.request(`/activities/${activityId}`, {
      method: "DELETE",
    });
  }

  // =============================================================================
  // Veterinarians
  // =============================================================================

  async getVeterinarians(
    latitude?: number,
    longitude?: number,
    radius?: number,
    specialty?: string
  ): Promise<VeterinariansResponse> {
    const params = new URLSearchParams();
    if (latitude !== undefined) params.append("latitude", latitude.toString());
    if (longitude !== undefined) params.append("longitude", longitude.toString());
    if (radius) params.append("radius", radius.toString());
    if (specialty) params.append("specialty", specialty);

    const queryString = params.toString();
    const endpoint = `/veterinarians${queryString ? `?${queryString}` : ""}`;

    return await this.request<VeterinariansResponse>(endpoint);
  }

  async getVeterinarian(vetId: string): Promise<VeterinarianResponse> {
    return await this.request<VeterinarianResponse>(`/veterinarians/${vetId}`);
  }

  // =============================================================================
  // Chat
  // =============================================================================

  async sendChatMessage(messageData: ChatMessageCreate): Promise<ChatResponse> {
    return await this.request<ChatResponse>("/chat/ask", {
      method: "POST",
      body: JSON.stringify(messageData),
    });
  }

  async getChatHistory(limit?: number): Promise<ChatHistoryResponse> {
    const endpoint = `/chat/history${limit ? `?limit=${limit}` : ""}`;
    return await this.request<ChatHistoryResponse>(endpoint);
  }

  // =============================================================================
  // Analytics
  // =============================================================================

  async getDashboardStats(): Promise<DashboardStatsResponse> {
    return await this.request<DashboardStatsResponse>("/analytics/dashboard");
  }

  async getActivityStats(petId: string, days?: number): Promise<ActivityStatsResponse> {
    const endpoint = `/analytics/activity/${petId}${days ? `?days=${days}` : ""}`;
    return await this.request<ActivityStatsResponse>(endpoint);
  }
}

// =============================================================================
// Export API Client Instance
// =============================================================================

export const api = new APIClient(API_URL);
export default api;
