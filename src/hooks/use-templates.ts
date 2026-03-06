import { useQuery } from '@tanstack/react-query';
import { getTemplates, getTemplate } from '../api/templates';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates,
  });
}

export function useTemplate(id: number) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: () => getTemplate(id),
    enabled: !!id,
  });
}
