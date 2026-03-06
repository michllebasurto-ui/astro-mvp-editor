import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-slate-200">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mt-4">Página no encontrada</h2>
        <p className="text-slate-500 mt-2 mb-8">Lo sentimos, la página que buscas no existe.</p>
        <Button onClick={() => navigate('/')}>
          <Home className="h-4 w-4" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
