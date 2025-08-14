// File: src/components/navigation/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Wrench,
  Menu,
  X,
  Home,
  BookOpen,
  History,
  LayoutDashboard,
  PlusCircle,
  FileText,
  LogOut,
  Shield,
  User,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, adminData, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/blogs', label: 'Blogs', icon: BookOpen },
    { path: '/history', label: 'Hackathon History', icon: History },
  ];

  const adminNavItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/create-blog', label: 'Create Blog', icon: PlusCircle },
    { path: '/admin/create-history', label: 'Create History', icon: FileText },
  ];

  const NavLink = ({ to, children, icon: Icon, className = '' }) => (
    <Link
      to={to}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${
          isActivePath(to)
            ? 'bg-blue-100 text-blue-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Link>
  );

  return (
    <nav
      className={`
      sticky top-0 z-50 bg-white border-b transition-all duration-300
      ${scrolled ? 'shadow-lg border-gray-200' : 'border-gray-100'}
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Mechathon
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Engineering Club</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Public Navigation */}
            {publicNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} icon={item.icon}>
                {item.label}
              </NavLink>
            ))}

            {/* Admin Navigation */}
            {isAuthenticated && (
              <>
                <div className="mx-2 w-px h-6 bg-gray-300" />
                {adminNavItems.map((item) => (
                  <NavLink key={item.path} to={item.path} icon={item.icon}>
                    {item.label}
                  </NavLink>
                ))}
              </>
            )}
          </div>

          {/* User Menu / Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 h-auto"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {adminData?.name || 'Admin'}
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  />
                </Button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{adminData?.name}</p>
                      <p className="text-sm text-gray-500">{adminData?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4" />
                        Profile Settings
                      </Link>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/admin/login" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 bg-white/95 backdrop-blur-md relative z-50">
            <div className="space-y-1">
              {/* Public Navigation */}
              {publicNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActivePath(item.path)
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}

              {/* Admin Navigation */}
              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 my-4" />
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Admin Panel
                    </p>
                  </div>
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                        ${
                          isActivePath(item.path)
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                </>
              )}

              {/* User Actions */}
              <div className="border-t border-gray-200 my-4" />
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{adminData?.name}</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                  </div>
                  <Link
                    to="/admin/profile"
                    className="flex items-center gap-3 px-3 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                  >
                    <User className="w-5 h-5" />
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  className="flex items-center justify-center gap-2 mx-3 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Shield className="w-5 h-5" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Overlay for user dropdown */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40 hidden md:block"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
