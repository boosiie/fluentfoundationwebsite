import ProtectedRoute from './ProtectedRoute.jsx';

export default function RequireContributor({ children }) {
  return <ProtectedRoute roles={['ADMIN', 'CONTRIBUTOR']}>{children}</ProtectedRoute>;
}
