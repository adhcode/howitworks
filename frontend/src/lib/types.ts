/**
 * Shared TypeScript types for the real estate platform
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'REALTOR' | 'INVESTOR';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Realtor {
  id: string;
  userId: string;
  phoneNumber?: string;
  residentialAddress?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  profileImage?: string;
  slug: string;
  user: User;
}

export interface Investor {
  id: string;
  userId: string;
  phoneNumber?: string;
  address?: string;
  investmentBudget?: number;
  preferredLocation?: string;
  profileImage?: string;
  user: User;
}

export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  propertyType: string;
  status: string;
  images: string[];
  realtorId: string;
  realtor: Realtor;
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  investorId: string;
  propertyId: string;
  amount: number;
  investmentType: string;
  status: string;
  expectedReturn?: number;
  investmentDate: string;
  property: Property;
  investor: Investor;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: string;
  source?: string;
  propertyId?: string;
  realtorId: string;
  investorId?: string;
  property?: Property;
  realtor: Realtor;
  investor?: Investor;
  createdAt: string;
  updatedAt: string;
}

export interface Commission {
  id: string;
  client: string;
  amount: number;
  status: string;
  transactionDate: string;
  realtorId: string;
  propertyId?: string;
  realtor: Realtor;
  property?: Property;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Dashboard specific types
export interface InvestorDashboard {
  investor: Investor;
  stats: {
    totalInvestments: number;
    activeInvestments: number;
    pendingInvestments: number;
    totalExpectedReturns: number;
  };
  recentInvestments: Investment[];
}

export interface RealtorDashboard {
  realtor: Realtor;
  stats: {
    leadsGenerated: number;
    referralClicks: number;
    commissionsEarned: number;
  };
  recentLeads: Lead[];
  referralLink: string;
}

export interface AdminDashboard {
  stats: {
    totalUsers: number;
    totalRealtors: number;
    totalInvestors: number;
    totalProperties: number;
    totalInvestments: number;
    totalCommissions: number;
  };
  recentUsers: User[];
  recentProperties: Property[];
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

// Form types
export interface CreateInvestmentDto {
  propertyId: string;
  amount: number;
  investmentType: string;
  expectedReturn?: number;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  investmentBudget?: number;
  preferredLocation?: string;
}

export interface CreateLeadDto {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  propertyId?: string;
  realtorId: string;
}