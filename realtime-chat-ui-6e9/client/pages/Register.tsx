import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/services/api';
import { mockAuthUser } from '@/services/mockData';
import { Mail, Lock, User, AlertCircle, Loader2, MessageCircle, MessageSquare } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    about: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      try {
        const response = await authAPI.register(
          formData.email,
          formData.password,
          formData.username
        );
        const { user, token } = response.data;
        login(user, token);
        navigate('/chat');
      } catch (backendError) {
        const demoUser = {
          ...mockAuthUser,
          username: formData.username,
          email: formData.email,
          about: formData.about || undefined,
        };
        const demoToken = 'demo-token-' + Date.now();
        login(demoUser, demoToken);
        navigate('/chat');
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f0f2f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3 gap-2">
            <div className="bg-[#128C7E] p-2 rounded-full">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">ChatFlow</h1>
          </div>
          <p className="text-gray-600 text-sm">Join and start chatting</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Create Account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="john_doe"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-9 h-10 bg-gray-50 border-gray-300 text-sm focus:bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-9 h-10 bg-gray-50 border-gray-300 text-sm focus:bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-9 h-10 bg-gray-50 border-gray-300 text-sm focus:bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-9 h-10 bg-gray-50 border-gray-300 text-sm focus:bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                About (optional)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                <textarea
                  id="about"
                  name="about"
                  placeholder="Tell us about yourself..."
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 h-20 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#128C7E]/20 resize-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-[#128C7E] hover:bg-[#0e7066] text-white font-medium rounded-lg mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Sign in link */}
          <Link to="/login">
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          💡 Demo: Use any credentials
        </p>
      </div>
    </div>
  );
}
