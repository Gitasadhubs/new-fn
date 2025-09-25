import { apiRequest } from "./queryClient";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const api = {
  // Tutorials
  getTutorials: async () => {
    const response = await fetch(`${API_BASE_URL}/api/tutorials`);
    if (!response.ok) throw new Error("Failed to fetch tutorials");
    return response.json();
  },

  getTutorial: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/tutorials/${id}`);
    if (!response.ok) throw new Error("Failed to fetch tutorial");
    return response.json();
  },

  // Progress
  getUserProgress: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/progress/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch progress");
    return response.json();
  },

  updateProgress: async (data: any) => {
    return apiRequest("POST", `${API_BASE_URL}/api/progress`, data);
  },

  // Projects
  getUserProjects: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/projects/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json();
  },

  createProject: async (data: any) => {
    return apiRequest("POST", `${API_BASE_URL}/api/projects`, data);
  },

  // GitHub
  pushToGitHub: async (data: { projectName: string; files: Record<string, string>; commitMessage: string }) => {
    return apiRequest("POST", `${API_BASE_URL}/api/push`, data);
  },

  // Export
  exportProject: async (data: { projectName: string; files: Record<string, string> }) => {
    return apiRequest("POST", `${API_BASE_URL}/api/export`, data);
  },
};
