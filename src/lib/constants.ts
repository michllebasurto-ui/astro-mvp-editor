export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const ASTRO_URL = import.meta.env.VITE_ASTRO_URL || 'http://localhost:4321';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  TENANTS: '/tenants',
  TENANT_NEW: '/tenants/new',
  TENANT_DETAIL: (slug: string) => `/tenants/${slug}`,
  TENANT_EDITOR: (slug: string) => `/tenants/${slug}/editor`,
  TEMPLATES: '/templates',
} as const;
