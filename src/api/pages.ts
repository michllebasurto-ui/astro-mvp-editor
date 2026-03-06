import client from './client';
import type { Page, PageCreate } from '../types';

export async function getPages(tenantId: number): Promise<Page[]> {
  const { data } = await client.get<Page[]>(`/pages?tenantId=${tenantId}`);
  return data;
}

export async function createPage(tenantId: number, page: PageCreate): Promise<Page> {
  const { data } = await client.post<Page>('/pages', { ...page, tenantId });
  return data;
}

export async function updatePage(id: number, page: Partial<PageCreate>): Promise<Page> {
  const { data } = await client.put<Page>(`/pages/${id}`, page);
  return data;
}

export async function deletePage(id: number): Promise<void> {
  await client.delete(`/pages/${id}`);
}
