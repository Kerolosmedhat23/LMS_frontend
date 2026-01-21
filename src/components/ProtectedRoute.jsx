import { Navigate } from 'react-router-dom';
import { useAuth } from '../../src/hooks/useAuth';

/**
 * Protected route component - redirects to login if not authenticated
 * Usage: <ProtectedRoute element={<MyComponent />} />
 */
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/account/login" replace />;
};

export default ProtectedRoute;
