import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

import { useAuth } from '@/context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
