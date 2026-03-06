import client from './client';
import type { LoginCredentials, LoginResponse, User } from '../types';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await client.post<LoginResponse>('/auth/login', credentials);
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await client.get<User>('/auth/me');
  return data;
}
