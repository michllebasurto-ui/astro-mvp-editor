import { useAuthStore } from '../../stores/auth-store';
import { User } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-violet-600" />
          </div>
          <span className="font-medium">{user?.name || user?.email}</span>
        </div>
      </div>
    </header>
  );
}
