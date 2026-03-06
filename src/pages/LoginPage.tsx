import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth-store';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../lib/constants';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@astromvp.com', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Astro MVP Editor</h1>
          <p className="text-slate-500 mt-1 text-sm">Panel de Administración</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="admin@astromvp.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
            <Button type="submit" className="w-full" loading={isSubmitting} size="lg">
              Iniciar sesión
            </Button>
          </form>

          <div className="mt-6 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 text-center">
              Credenciales de prueba: <br />
              <span className="font-mono font-medium">admin@astromvp.com</span> / <span className="font-mono font-medium">Admin123!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
