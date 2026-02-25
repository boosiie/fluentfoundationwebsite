import ProtectedRoute from './ProtectedRoute.jsx';

export default function RequireAdmin({ children }) {
  return <ProtectedRoute roles={['ADMIN']}>{children}</ProtectedRoute>;
}
