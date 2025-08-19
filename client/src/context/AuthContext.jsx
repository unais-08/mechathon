import { useState, useEffect, createContext, useContext } from 'react';

// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminInfo = localStorage.getItem('adminData');

    if (token && adminInfo) {
      try {
        const parsedAdmin = JSON.parse(adminInfo);
        setIsAuthenticated(true);
        setAdminData(parsedAdmin);
      } catch (error) {
        console.error('Invalid JSON in localStorage for adminData:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
    setLoading(false);
  }, []);

  const login = (token, admin) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(admin));
    setIsAuthenticated(true);
    setAdminData(admin);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAuthenticated(false);
    setAdminData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminData,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
export { AuthProvider, useAuth };
