import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPages, createPage, updatePage, deletePage } from '../api/pages';
import type { PageCreate } from '../types';

export function usePages(tenantId: number) {
  return useQuery({
    queryKey: ['pages', tenantId],
    queryFn: () => getPages(tenantId),
    enabled: !!tenantId,
  });
}

export function useCreatePage(tenantId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PageCreate) => createPage(tenantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages', tenantId] });
    },
  });
}

export function useUpdatePage(tenantId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PageCreate> }) =>
      updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages', tenantId] });
    },
  });
}

export function useDeletePage(tenantId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages', tenantId] });
    },
  });
}
