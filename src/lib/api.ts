/**
 * Dharma Loka School CMS & Public REST API Client
 * Connects Next.js to the Laravel REST API backend with Bearer Sanctum authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  status: number;
  meta?: any;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "super_admin" | "school_admin" | "editor";
  role_name?: string;
  is_active: boolean;
  avatar_url?: string;
}

// Token & User Persistence
export const AuthStorage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("dharma_loka_token");
  },
  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("dharma_loka_token", token);
  },
  removeToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("dharma_loka_token");
  },
  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("dharma_loka_user");
    if (!userStr) return null;
    try {
      const parsed = JSON.parse(userStr);
      if (parsed && parsed.user) return parsed.user;
      return parsed;
    } catch {
      return null;
    }
  },
  setUser: (user: User): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("dharma_loka_user", JSON.stringify(user));
  },
  removeUser: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("dharma_loka_user");
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("dharma_loka_token");
    localStorage.removeItem("dharma_loka_user");
  }
};

/**
 * Universal fetch wrapper for API calls
 */
export async function fetchApi<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const headers = new Headers(options.headers || {});

  // Add Accept header
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  // Inject Bearer token if available
  const token = AuthStorage.getToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Set Content-Type to JSON if body is a string and not FormData
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const status = res.status;
    let json: any = null;

    try {
      json = await res.json();
    } catch {
      json = null;
    }

    if (status === 401) {
      AuthStorage.clear();
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin") && !window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login?expired=1";
      }
      return {
        status,
        error: "Sesi telah berakhir atau tidak terotorisasi. Silakan login kembali.",
      };
    }

    if (!res.ok) {
      return {
        status,
        error: json?.message || json?.error || `Terjadi kesalahan (Kode: ${status})`,
        errors: json?.errors,
        data: json?.data,
      };
    }

    return {
      status,
      data: (json && ("data" in json)) ? json.data : json,
      message: json?.message,
      meta: json?.meta,
    };
  } catch (err: any) {
    return {
      status: 0,
      error: err?.message || "Tidak dapat terhubung ke server backend API.",
    };
  }
}

// ----------------------------------------------------
// PUBLIC API ENDPOINTS
// ----------------------------------------------------

export const publicApi = {
  getProfile: () => fetchApi("/public/profile"),
  getNews: (params?: { category?: string; search?: string; page?: number; per_page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category && params.category !== "all") searchParams.set("category", params.category);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.per_page) searchParams.set("per_page", params.per_page.toString());
    const query = searchParams.toString();
    return fetchApi(`/public/news${query ? `?${query}` : ""}`);
  },
  getNewsDetail: (slug: string) => fetchApi(`/public/news/${slug}`),
  getAnnouncements: () => fetchApi("/public/announcements"),
  getPrograms: () => fetchApi("/public/programs"),
  getProgramDetail: (slug: string) => fetchApi(`/public/programs/${slug}`),
  getAchievements: (params?: { level?: string; category?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.level) searchParams.set("level", params.level);
    if (params?.category) searchParams.set("category", params.category);
    const query = searchParams.toString();
    return fetchApi(`/public/achievements${query ? `?${query}` : ""}`);
  },
  getGalleries: (params?: { category?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set("category", params.category);
    const query = searchParams.toString();
    return fetchApi(`/public/galleries${query ? `?${query}` : ""}`);
  },
  submitAdmissionInquiry: (data: {
    student_name: string;
    parent_name: string;
    email: string;
    phone: string;
    target_level: string;
    academic_year: string;
    previous_school?: string;
    notes?: string;
  }) => fetchApi("/public/admissions/inquiry", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  submitContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => fetchApi("/public/contact", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// ----------------------------------------------------
// ADMIN AUTH & MANAGEMENT API ENDPOINTS
// ----------------------------------------------------

export const adminApi = {
  // Auth
  login: (credentials: { email: string; password: string }) => 
    fetchApi("/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  getMe: () => fetchApi("/admin/me"),
  logout: () => fetchApi("/admin/logout", { method: "POST" }),
  changePassword: (data: { current_password: string; password: string; password_confirmation: string }) =>
    fetchApi("/admin/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Dashboard Overview
  getDashboardStats: () => fetchApi("/admin/dashboard"),

  // News CRUD
  getNews: (params?: { search?: string; status?: string; category_id?: number; page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set("search", params.search);
    if (params?.status) searchParams.set("status", params.status);
    if (params?.category_id) searchParams.set("category_id", params.category_id.toString());
    if (params?.page) searchParams.set("page", params.page.toString());
    const query = searchParams.toString();
    return fetchApi(`/admin/news${query ? `?${query}` : ""}`);
  },
  getCategories: () => fetchApi("/admin/news-categories"),
  getNewsDetail: (id: number) => fetchApi(`/admin/news/${id}`),
  createNews: (data: any) => fetchApi("/admin/news", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateNews: (id: number, data: any) => fetchApi(`/admin/news/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  deleteNews: (id: number) => fetchApi(`/admin/news/${id}`, { method: "DELETE" }),
  togglePublishNews: (id: number) => fetchApi(`/admin/news/${id}/toggle-publish`, { method: "PATCH" }),

  // Announcements CRUD
  getAnnouncements: () => fetchApi("/admin/announcements"),
  createAnnouncement: (data: any) => fetchApi("/admin/announcements", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateAnnouncement: (id: number, data: any) => fetchApi(`/admin/announcements/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  deleteAnnouncement: (id: number) => fetchApi(`/admin/announcements/${id}`, { method: "DELETE" }),

  // PPDB Inquiries CRM
  getAdmissions: (params?: { status?: string; target_level?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set("status", params.status);
    if (params?.target_level) searchParams.set("target_level", params.target_level);
    if (params?.search) searchParams.set("search", params.search);
    const query = searchParams.toString();
    return fetchApi(`/admin/admissions${query ? `?${query}` : ""}`);
  },
  updateAdmissionStatus: (id: number, data: { status: string; notes?: string }) =>
    fetchApi(`/admin/admissions/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Contact Messages Inbox
  getMessages: (params?: { status?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set("status", params.status);
    if (params?.search) searchParams.set("search", params.search);
    const query = searchParams.toString();
    return fetchApi(`/admin/messages${query ? `?${query}` : ""}`);
  },
  updateMessageStatus: (id: number, data: { status: string; admin_notes?: string }) =>
    fetchApi(`/admin/messages/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteMessage: (id: number) => fetchApi(`/admin/messages/${id}`, { method: "DELETE" }),

  // Academic Programs
  getPrograms: () => fetchApi("/admin/programs"),
  updateProgram: (id: number, data: any) => fetchApi(`/admin/programs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  // Achievements
  getAchievements: () => fetchApi("/admin/achievements"),
  createAchievement: (data: any) => fetchApi("/admin/achievements", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateAchievement: (id: number, data: any) => fetchApi(`/admin/achievements/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  deleteAchievement: (id: number) => fetchApi(`/admin/achievements/${id}`, { method: "DELETE" }),

  // Galleries
  getGalleries: () => fetchApi("/admin/galleries"),
  createGallery: (data: any) => fetchApi("/admin/galleries", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  deleteGallery: (id: number) => fetchApi(`/admin/galleries/${id}`, { method: "DELETE" }),

  // User Management (Super Admin only)
  getUsers: () => fetchApi("/admin/users"),
  createUser: (data: any) => fetchApi("/admin/users", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateUser: (id: number, data: any) => fetchApi(`/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  deleteUser: (id: number) => fetchApi(`/admin/users/${id}`, { method: "DELETE" }),

  // School Settings
  getSettings: () => fetchApi("/admin/settings"),
  updateSettings: (settings: Record<string, string>) => fetchApi("/admin/settings", {
    method: "PUT",
    body: JSON.stringify({ settings }),
  }),

  // Activity Logs
  getActivityLogs: (params?: { action?: string; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.action) searchParams.set("action", params.action);
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    const query = searchParams.toString();
    return fetchApi(`/admin/logs${query ? `?${query}` : ""}`);
  },

  // Media Upload
  uploadMedia: async (file: File, folder: string = "uploads") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const token = AuthStorage.getToken();
    const res = await fetch(`${API_BASE_URL}/admin/media/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Gagal mengunggah berkas");
    }
    return json.data;
  },
};

