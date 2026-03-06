import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth-store';
import { ROUTES } from '../lib/constants';

export function useAuth(requireAuth = true) {
  const { isAuthenticated, user, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated, requireAuth, navigate]);

  return { isAuthenticated, user, token };
}
