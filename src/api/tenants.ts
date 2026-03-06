import client from './client';
import type { Tenant, TenantCreate } from '../types';

export async function getTenants(): Promise<Tenant[]> {
  const { data } = await client.get<Tenant[]>('/tenants');
  return data;
}

export async function getTenant(slug: string): Promise<Tenant> {
  const { data } = await client.get<Tenant>(`/tenants/${slug}`);
  return data;
}

export async function createTenant(tenant: TenantCreate): Promise<Tenant> {
  const { data } = await client.post<Tenant>('/tenants', tenant);
  return data;
}

export async function updateTenant(slug: string, tenant: Partial<TenantCreate>): Promise<Tenant> {
  const { data } = await client.put<Tenant>(`/tenants/${slug}`, tenant);
  return data;
}

export async function deleteTenant(slug: string): Promise<void> {
  await client.delete(`/tenants/${slug}`);
}

export async function exportTenant(slug: string): Promise<Blob> {
  const { data } = await client.get(`/tenants/${slug}/export`, {
    responseType: 'blob',
  });
  return data;
}
