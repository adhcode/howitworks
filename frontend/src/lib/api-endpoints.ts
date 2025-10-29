/**
 * API endpoint definitions for the real estate platform
 * Centralized endpoint management with type safety
 */

import { apiClient } from './api-client';
import type {
  User,
  Property,
  Investment,
  Lead,
  Commission,
  Blog,
  InvestorDashboard,
  RealtorDashboard,
  AdminDashboard,
  LoginResponse,
  CreateInvestmentDto,
  UpdateProfileDto,
  CreateLeadDto,
  PaginatedResponse,
} from './types';

// Authentication endpoints
export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>('/auth/login', { email, password }),
  
  register: (userData: any) =>
    apiClient.post<LoginResponse>('/auth/register', userData),
  
  getProfile: () =>
    apiClient.get<User>('/auth/profile'),
};

// User endpoints
export const userApi = {
  getAll: (role?: string) =>
    apiClient.get<User[]>(`/users${role ? `?role=${role}` : ''}`),
  
  getById: (id: string) =>
    apiClient.get<User>(`/users/${id}`),
  
  updateStatus: (id: string, isActive: boolean) =>
    apiClient.put<User>(`/users/${id}/status`, { isActive }),
};

// Property endpoints
export const propertyApi = {
  getAll: (params?: { 
    page?: number; 
    limit?: number; 
    location?: string; 
    propertyType?: string; 
    minPrice?: number; 
    maxPrice?: number; 
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<PaginatedResponse<Property>>(`/properties${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id: string) =>
    apiClient.get<Property>(`/properties/${id}`),
  
  getFeatured: () =>
    apiClient.get<Property[]>('/properties/featured'),
  
  create: (propertyData: any) =>
    apiClient.post<Property>('/properties', propertyData),
  
  createWithFiles: (propertyData: any, files: File[]) => {
    const formData = new FormData();
    
    // Append property data
    Object.keys(propertyData).forEach(key => {
      if (key !== 'images' && propertyData[key] !== undefined) {
        formData.append(key, propertyData[key]);
      }
    });
    
    // Append files
    files.forEach(file => {
      formData.append('images', file);
    });
    
    return apiClient.postFormData<Property>('/properties', formData);
  },
  
  update: (id: string, propertyData: any) =>
    apiClient.put<Property>(`/properties/${id}`, propertyData),
  
  delete: (id: string) =>
    apiClient.delete(`/properties/${id}`),
  
  toggleFeatured: (id: string) =>
    apiClient.put<Property>(`/properties/${id}/featured`),
};

// Investment endpoints
export const investmentApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<PaginatedResponse<Investment>>(`/investor/investments${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id: string) =>
    apiClient.get<Investment>(`/investor/investments/${id}`),
  
  create: (investmentData: CreateInvestmentDto) =>
    apiClient.post<Investment>('/investor/investments', investmentData),
  
  update: (id: string, investmentData: Partial<CreateInvestmentDto>) =>
    apiClient.put<Investment>(`/investor/investments/${id}`, investmentData),
  
  delete: (id: string) =>
    apiClient.delete(`/investor/investments/${id}`),
};

// Lead endpoints
export const leadApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<PaginatedResponse<Lead>>(`/leads${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id: string) =>
    apiClient.get<Lead>(`/leads/${id}`),
  
  create: (leadData: CreateLeadDto) =>
    apiClient.post<Lead>('/leads', leadData),
  
  updateStatus: (id: string, status: string) =>
    apiClient.put<Lead>(`/leads/${id}/status`, { status }),
  
  // Realtor specific
  getRealtorLeads: (params?: { page?: number; limit?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<PaginatedResponse<Lead>>(`/realtor/leads${queryString ? `?${queryString}` : ''}`);
  },
};

// Commission endpoints
export const commissionApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<PaginatedResponse<Commission>>(`/commissions${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id: string) =>
    apiClient.get<Commission>(`/commissions/${id}`),
  
  getRealtorCommissions: (params?: { page?: number; limit?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<PaginatedResponse<Commission>>(`/realtor/commissions${queryString ? `?${queryString}` : ''}`);
  },
  
  requestPayout: (id: string) =>
    apiClient.post<Commission>(`/commissions/${id}/request-payout`),
  
  updateStatus: (id: string, status: string) =>
    apiClient.put<Commission>(`/commissions/${id}/status`, { status }),
};

// Blog endpoints
export const blogApi = {
  getAll: (params?: { page?: number; limit?: number; published?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<PaginatedResponse<Blog>>(`/blog${queryString ? `?${queryString}` : ''}`);
  },
  
  getBySlug: (slug: string) =>
    apiClient.get<Blog>(`/blog/${slug}`),
  
  getFeatured: () =>
    apiClient.get<Blog[]>('/blog/featured'),
};

// Dashboard endpoints
export const dashboardApi = {
  getInvestorDashboard: () =>
    apiClient.get<InvestorDashboard>('/investor/dashboard'),
  
  getRealtorDashboard: () =>
    apiClient.get<RealtorDashboard>('/realtor/dashboard'),
  
  getAdminDashboard: () =>
    apiClient.get<AdminDashboard>('/admin/dashboard'),
  
  getAdminAnalytics: () =>
    apiClient.get<any>('/admin/analytics'),

  // Admin specific endpoints
  getAdminInvestments: (params?: any) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<any>(`/admin/investments${queryString ? `?${queryString}` : ''}`);
  },

  getAdminProperties: (params?: any) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return apiClient.get<any>(`/properties${queryString ? `?${queryString}` : ''}`);
  },

  createInvestment: (data: any) =>
    apiClient.post<any>('/admin/investments', data),

  updateInvestment: (id: string, data: any) =>
    apiClient.put<any>(`/admin/investments/${id}`, data),

  deleteInvestment: (id: string) =>
    apiClient.delete(`/admin/investments/${id}`),
};

// Profile endpoints
export const profileApi = {
  getInvestorProfile: () =>
    apiClient.get<any>('/investor/profile'),
  
  updateInvestorProfile: (profileData: UpdateProfileDto) =>
    apiClient.put<any>('/investor/profile', profileData),
  
  getRealtorProfile: () =>
    apiClient.get<any>('/realtor/profile'),
  
  updateRealtorProfile: (profileData: any) =>
    apiClient.put<any>('/realtor/profile', profileData),
  
  getRealtorPerformance: () =>
    apiClient.get<any>('/realtor/performance'),
};

// Realtor specific endpoints
export const realtorApi = {
  getAll: () =>
    apiClient.get<any[]>('/admin/realtors'),
  
  getById: (id: string) =>
    apiClient.get<any>(`/admin/realtors/${id}`),
  
  getBySlug: (slug: string) =>
    apiClient.get<any>(`/realtors/slug/${slug}`),
  
  create: (realtorData: any) =>
    apiClient.post<any>('/admin/realtors', realtorData),
  
  update: (id: string, realtorData: any) =>
    apiClient.put<any>(`/admin/realtors/${id}`, realtorData),

  updateStatus: (id: string, isActive: boolean) =>
    apiClient.put<any>(`/admin/realtors/${id}/status`, { isActive }),

  delete: (id: string) =>
    apiClient.delete(`/admin/realtors/${id}`),

  // Invitation system
  invite: (invitationData: { email: string; firstName: string; lastName: string }) =>
    apiClient.post<any>('/admin/realtors/invite', invitationData),
  
  getInvitations: () =>
    apiClient.get<any[]>('/admin/realtors/invitations'),
  
  validateInvitation: (token: string) =>
    apiClient.get<any>(`/auth/realtor-invitation/${token}`),
  
  acceptInvitation: (token: string, realtorData: any) =>
    apiClient.post<any>(`/auth/realtor-invitation/${token}/accept`, realtorData),
};

// Investor specific endpoints
export const investorApi = {
  getAll: () =>
    apiClient.get<any[]>('/admin/investors'),
  
  getById: (id: string) =>
    apiClient.get<any>(`/admin/investors/${id}`),

  update: (id: string, data: any) =>
    apiClient.put<any>(`/admin/investors/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/admin/investors/${id}`),

  updateStatus: (id: string, isActive: boolean) =>
    apiClient.put<any>(`/admin/investors/${id}/status`, { isActive }),
};