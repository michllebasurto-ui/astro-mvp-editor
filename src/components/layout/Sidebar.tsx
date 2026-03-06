import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, FileText, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/auth-store';
import { ROUTES } from '../../lib/constants';
import { cn } from '../../lib/utils';

const navItems = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Clientes', href: ROUTES.TENANTS, icon: Building2 },
  { label: 'Plantillas', href: ROUTES.TEMPLATES, icon: FileText },
];

export function Sidebar() {
  const { logout } = useAuthStore();

  return (
    <aside className="w-64 bg-slate-900 flex flex-col h-screen fixed left-0 top-0">
      <div className="px-6 py-5 border-b border-slate-800">
        <h1 className="text-white font-bold text-xl">Astro MVP</h1>
        <p className="text-slate-400 text-xs mt-0.5">Panel de Administración</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            end={href === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 w-full transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
