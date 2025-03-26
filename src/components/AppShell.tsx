
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface AppShellProps {
  requiredRole?: UserRole | UserRole[];
}

const AppShell: React.FC<AppShellProps> = ({ requiredRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-2 w-24 bg-primary/20 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check role requirement if specified
  if (requiredRole && user) {
    const hasRequiredRole = Array.isArray(requiredRole)
      ? requiredRole.includes(user.role as UserRole)
      : user.role === requiredRole;

    if (!hasRequiredRole) {
      // Redirect to the default dashboard for their role
      if (user.role === 'admin') {
        return <Navigate to="/admin" replace />;
      } else if (user.role === 'bank') {
        return <Navigate to="/bank" replace />;
      } else {
        return <Navigate to="/user" replace />;
      }
    }
  }

  // Render children if authenticated and authorized
  return <Outlet />;
};

export default AppShell;
