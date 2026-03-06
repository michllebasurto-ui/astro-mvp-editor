import client from './client';
import type { Template } from '../types';

export async function getTemplates(): Promise<Template[]> {
  const { data } = await client.get<Template[]>('/templates');
  return data;
}

export async function getTemplate(id: number): Promise<Template> {
  const { data } = await client.get<Template>(`/templates/${id}`);
  return data;
}
