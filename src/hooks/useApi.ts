/**
 * Custom React hooks for API calls
 * Provides easy-to-use hooks for common API operations with loading and error states
 */

import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import type {
  Pet,
  PetCreate,
  PetUpdate,
  HealthScan,
  HealthScore,
  Activity,
  ActivityCreate,
  Veterinarian,
  ChatMessageCreate,
  ScanType,
  ActivityType,
} from "../types/api";

// =============================================================================
// Generic API Hook
// =============================================================================

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useApiState<T>(initialData: T | null = null): UseApiState<T> & {
  setData: (data: T | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
} {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return { data, loading, error, setData, setLoading, setError };
}

// =============================================================================
// Pets Hooks
// =============================================================================

export function usePets() {
  const { data, loading, error, setData, setLoading, setError } = useApiState<Pet[]>([]);

  const fetchPets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getPets();
      if (response.success) {
        setData(response.data.pets);
      } else {
        throw new Error("Failed to fetch pets");
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPet = async (petData: PetCreate): Promise<Pet | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.createPet(petData);
      if (response.success) {
        await fetchPets(); // Refresh the list
        return response.data.pet;
      }
      throw new Error("Failed to create pet");
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePet = async (petId: string, petData: PetUpdate): Promise<Pet | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.updatePet(petId, petData);
      if (response.success) {
        await fetchPets(); // Refresh the list
        return response.data.pet;
      }
      throw new Error("Failed to update pet");
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePet = async (petId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.deletePet(petId);
      if (response.success) {
        await fetchPets(); // Refresh the list
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (petId: string, photo: File): Promise<Pet | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.uploadPetPhoto(petId, photo);
      if (response.success) {
        await fetchPets(); // Refresh the list
        return response.data.pet;
      }
      throw new Error("Failed to upload photo");
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return {
    pets: data,
    loading,
    error,
    fetchPets,
    createPet,
    updatePet,
    deletePet,
    uploadPhoto,
  };
}

// =============================================================================
// Health Scans Hooks
// =============================================================================

export function useHealthScans(petId: string, scanType?: ScanType) {
  const { data, loading, error, setData, setLoading, setError } = useApiState<HealthScan[]>([]);

  const fetchScans = useCallback(async () => {
    if (!petId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.getHealthScans(petId, scanType);
      if (response.success) {
        setData(response.data.health_scans);
      } else {
        throw new Error("Failed to fetch health scans");
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [petId, scanType]);

  const createScan = async (
    scanType: ScanType,
    image: File,
    notes?: string
  ): Promise<HealthScan | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.createHealthScan(petId, scanType, image, notes);
      if (response.success) {
        await fetchScans(); // Refresh the list
        return response.data.health_scan;
      }
      throw new Error("Failed to create health scan");
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (petId) {
      fetchScans();
    }
  }, [fetchScans, petId]);

  return {
    scans: data,
    loading,
    error,
    fetchScans,
    createScan,
  };
}

export function useHealthScore(petId: string) {
  const { data, loading, error, setData, setLoading, setError } = useApiState<HealthScore | null>(null);

  const fetchScore = useCallback(async () => {
    if (!petId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.getHealthScore(petId);
      if (response.success) {
        setData(response.data.health_score);
      } else {
        throw new Error("Failed to fetch health score");
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    if (petId) {
      fetchScore();
    }
  }, [fetchScore, petId]);

  return {
    healthScore: data,
    loading,
    error,
    fetchScore,
  };
}

// =============================================================================
// Activities Hooks
// =============================================================================

export function useActivities(petId: string, activityType?: ActivityType) {
  const { data, loading, error, setData, setLoading, setError } = useApiState<Activity[]>([]);

  const fetchActivities = useCallback(async () => {
    if (!petId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.getActivities(petId, activityType);
      if (response.success) {
        setData(response.data.activities);
      } else {
        throw new Error("Failed to fetch activities");
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [petId, activityType]);

  const createActivity = async (activityData: ActivityCreate): Promise<Activity | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.createActivity(activityData);
      if (response.success) {
        await fetchActivities(); // Refresh the list
        return response.data.activity;
      }
      throw new Error("Failed to create activity");
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteActivity = async (activityId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.deleteActivity(activityId);
      if (response.success) {
        await fetchActivities(); // Refresh the list
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (petId) {
      fetchActivities();
    }
  }, [fetchActivities, petId]);

  return {
    activities: data,
    loading,
    error,
    fetchActivities,
    createActivity,
    deleteActivity,
  };
}

// =============================================================================
// Veterinarians Hook
// =============================================================================

export function useVeterinarians(
  latitude?: number,
  longitude?: number,
  radius?: number,
  specialty?: string
) {
  const { data, loading, error, setData, setLoading, setError } = useApiState<Veterinarian[]>([]);

  const fetchVeterinarians = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getVeterinarians(latitude, longitude, radius, specialty);
      if (response.success) {
        setData(response.data.veterinarians);
      } else {
        throw new Error("Failed to fetch veterinarians");
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, radius, specialty]);

  useEffect(() => {
    fetchVeterinarians();
  }, [fetchVeterinarians]);

  return {
    veterinarians: data,
    loading,
    error,
    fetchVeterinarians,
  };
}

// =============================================================================
// Chat Hook
// =============================================================================

export function useChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = async (messageData: ChatMessageCreate) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.sendChatMessage(messageData);
      if (response.success) {
        return response.data.chat_message;
      }
      throw new Error("Failed to send message");
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getChatHistory = async (limit?: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getChatHistory(limit);
      if (response.success) {
        return response.data.messages;
      }
      throw new Error("Failed to get chat history");
    } catch (err: any) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendMessage,
    getChatHistory,
  };
}

// =============================================================================
// Dashboard Stats Hook
// =============================================================================

export function useDashboardStats() {
  const { data, loading, error, setData, setLoading, setError } = useApiState<any>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getDashboardStats();
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error("Failed to fetch dashboard stats");
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats: data,
    loading,
    error,
    fetchStats,
  };
}
