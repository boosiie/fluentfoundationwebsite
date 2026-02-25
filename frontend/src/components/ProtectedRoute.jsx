import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading, token, hasRole } = useAuth();

  if (loading) {
    return <div className="page"><p>Loading...</p></div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
