import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/common/Navbar';

import Home from '@/pages/Home';
import Blogs from '@/pages/Blogs';
import History from '@/pages/History';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProtectedRoute from '@/components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Dummy admin routes for blog/history creation */}
          <Route
            path="/admin/create-blog"
            element={
              <ProtectedRoute>
                <div className="p-6">Create Blog Page (Coming soon)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-history"
            element={
              <ProtectedRoute>
                <div className="p-6">Create History Page (Coming soon)</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
