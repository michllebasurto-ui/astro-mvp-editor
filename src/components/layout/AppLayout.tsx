import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/tenants': 'Clientes',
  '/tenants/new': 'Nuevo Cliente',
  '/templates': 'Plantillas',
};

export function AppLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || '';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header title={title} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
