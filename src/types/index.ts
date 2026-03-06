export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Tenant {
  id: number;
  slug: string;
  subdomain: string;
  templatePath: string;
  brandName: string;
  logo: string;
  primaryColor: string;
  whatsapp?: string;
  navbarLinks: NavLink[];
  footerText: string;
  footerLinks: NavLink[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  pages: Page[];
}

export interface Page {
  id: number;
  tenantId: number;
  path: string;
  pageComponent: string;
  metaTitle: string;
  metaDescription: string;
  content: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: number;
  path: string;
  name: string;
  category: string;
  description: string;
  availablePages: string[];
  previewImageUrl: string;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface TenantCreate {
  slug: string;
  subdomain: string;
  templatePath: string;
  brandName: string;
  logo?: string;
  primaryColor: string;
  whatsapp?: string;
  navbarLinks: NavLink[];
  footerText: string;
  footerLinks: NavLink[];
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PageCreate {
  path: string;
  pageComponent: string;
  metaTitle: string;
  metaDescription: string;
  content: Record<string, unknown>;
  sortOrder?: number;
}
