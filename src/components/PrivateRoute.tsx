import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';

interface AuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth() as AuthContext;
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
