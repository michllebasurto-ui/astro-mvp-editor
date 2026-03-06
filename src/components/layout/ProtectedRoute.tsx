import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { FullPageSpinner } from '../ui/Spinner';
import { ROUTES } from '../../lib/constants';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, initialize } = useAuthStore();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    initialize().finally(() => setInitializing(false));
  }, [initialize]);

  if (initializing) return <FullPageSpinner />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return <>{children}</>;
}
