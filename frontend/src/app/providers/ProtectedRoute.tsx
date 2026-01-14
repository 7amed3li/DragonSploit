import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/model/authStore';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);

  if (!_hasHydrated) {
    return <div className="flex items-center justify-center h-screen bg-black text-cyber-green">Loading Security Context...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
