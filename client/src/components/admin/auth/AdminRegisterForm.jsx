import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, UserPlus, CheckCircle, AlertCircle, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from '@/utils/axiosInstance';

export const AdminRegisterForm = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { name, email, password } = registerForm;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const { data: resp } = await axios.post('/admin/register', registerForm);
      console.log(resp);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/admin/login'), 2000);
    } catch (err) {
      console.log();
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Admin Registration</h1>
      </div>

      <Card className="shadow-lg border-slate-200 w-100">
        <CardContent className="pt-6">
          {/* Alerts */}
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Fullname */}
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4" /> Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                disabled={loading}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4" /> Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                disabled={loading}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4" /> Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  disabled={loading}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Create Account
                </div>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm mt-6">
            <Button
              type="button"
              variant="link"
              className="text-slate-900 hover:text-slate-700 px-0 font-medium"
              onClick={() => navigate('/admin/login')}
              disabled={loading}
            >
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminRegisterForm;
