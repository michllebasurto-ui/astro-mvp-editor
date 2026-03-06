import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTenants, getTenant, createTenant, updateTenant, deleteTenant, exportTenant } from '../api/tenants';
import type { TenantCreate } from '../types';

export function useTenants() {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants,
  });
}

export function useTenant(slug: string) {
  return useQuery({
    queryKey: ['tenants', slug],
    queryFn: () => getTenant(slug),
    enabled: !!slug,
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TenantCreate) => createTenant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
}

export function useUpdateTenant(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<TenantCreate>) => updateTenant(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      queryClient.invalidateQueries({ queryKey: ['tenants', slug] });
    },
  });
}

export function useDeleteTenant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => deleteTenant(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
}

export function useExportTenant() {
  return useMutation({
    mutationFn: (slug: string) => exportTenant(slug),
  });
}
