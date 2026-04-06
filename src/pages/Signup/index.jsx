import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { setAuthToken } from '../../utils/auth';
import toast from 'react-hot-toast';

// Password strength calculation
function calculatePasswordStrength(password) {
  let strength = 0;
  let feedback = [];

  if (password.length >= 8) strength++;
  else feedback.push('At least 8 characters');

  if (password.length >= 12) strength++;
  else if (password.length >= 8) feedback.push('12+ characters for stronger password');

  if (/[a-z]/.test(password)) strength++;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) strength++;
  else feedback.push('Add uppercase letters');

  if (/[0-9]/.test(password)) strength++;
  else feedback.push('Add numbers');

  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  else feedback.push('Add special characters');

  const strengthLevels = {
    0: { level: 'Very Weak', color: 'bg-red-500', text: 'text-red-600' },
    1: { level: 'Weak', color: 'bg-orange-500', text: 'text-orange-600' },
    2: { level: 'Fair', color: 'bg-yellow-500', text: 'text-yellow-600' },
    3: { level: 'Good', color: 'bg-lime-500', text: 'text-lime-600' },
    4: { level: 'Strong', color: 'bg-green-500', text: 'text-green-600' },
    5: { level: 'Very Strong', color: 'bg-emerald-500', text: 'text-emerald-600' },
    6: { level: 'Very Strong', color: 'bg-emerald-500', text: 'text-emerald-600' },
  };

  return {
    score: Math.min(strength, 6),
    ...strengthLevels[Math.min(strength, 6)],
    feedback,
  };
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const passwordStrength = calculatePasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would call an API
      const mockToken = `token_${Date.now()}`;
      setAuthToken(mockToken);

      toast.success('Account created successfully!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error('Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Join fintechh</h1>
          <p className="text-slate-600">Create your account to get started</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors bg-slate-50 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-0 ${
                  errors.name
                    ? 'border-red-500 focus:bg-red-50'
                    : 'border-slate-200 focus:border-purple-500 focus:bg-white'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors bg-slate-50 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-0 ${
                  errors.email
                    ? 'border-red-500 focus:bg-red-50'
                    : 'border-slate-200 focus:border-purple-500 focus:bg-white'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative mb-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors bg-slate-50 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-0 pr-12 ${
                    errors.password
                      ? 'border-red-500 focus:bg-red-50'
                      : 'border-slate-200 focus:border-purple-500 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.score / 6) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className={`text-xs font-semibold ${passwordStrength.text}`}>
                      {passwordStrength.level}
                    </span>
                  </div>

                  {/* Password Feedback */}
                  {passwordStrength.feedback.length > 0 && (
                    <div className="space-y-1">
                      {passwordStrength.feedback.map((tip, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                          <X size={14} className="text-red-500" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  )}
                  {passwordStrength.score === 6 && (
                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <Check size={14} />
                      Great password strength!
                    </div>
                  )}
                </div>
              )}

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors bg-slate-50 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-0 pr-12 ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:bg-red-50'
                      : 'border-slate-200 focus:border-purple-500 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link
            to="/login"
            className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-slate-600">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-purple-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
