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
    <div className="min-h-screen flex items-center justify-center p-4 overflow-y-auto py-8" style={{
      background: 'linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%)',
    }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {/* <div className="inline-block mb-4 p-4 rounded-full" style={{
            background: 'linear-gradient(135deg, var(--brand-green-light), var(--brand-green))',
            boxShadow: `
              0 10px 30px rgba(52, 199, 89, 0.4),
              inset -2px -2px 8px rgba(255, 255, 255, 0.8),
              inset 2px 2px 8px rgba(0, 0, 0, 0.1)
            `
          }}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.757 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM3 10a1 1 0 01 1 1h1a1 1 0 110-2H4a1 1 0 00-1 1zM5.757 5.757a1 1 0 000-1.414L5.05 3.636a1 1 0 10-1.414 1.414l.707.707z"></path>
            </svg>
          </div> */}
          <h1 className="text-4xl font-bold mb-2" style={{
            background: 'linear-gradient(to right, var(--brand-green), var(--brand-green-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Join fintechh</h1>
          <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Create your account to get started</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8 space-y-6 glossy-overlay" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.12),
            0 8px 24px rgba(0, 0, 0, 0.08),
            inset -1px -1px 2px rgba(255, 255, 255, 0.9),
            inset 1px 1px 2px rgba(0, 0, 0, 0.05)
          `
        }}>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                Full Name
              </label>
              <div style={{
                background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 -2px 4px rgba(255, 255, 255, 0.6)',
                borderRadius: '12px'
              }}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg bg-transparent focus:outline-none transition-all duration-200`}
                  style={{
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-xs font-medium" style={{ color: 'var(--brand-red)' }}>{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <div style={{
                background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 -2px 4px rgba(255, 255, 255, 0.6)',
                borderRadius: '12px'
              }}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-lg bg-transparent focus:outline-none transition-all duration-200`}
                  style={{
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-xs font-medium" style={{ color: 'var(--brand-red)' }}>{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div style={{
                background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 -2px 4px rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                position: 'relative'
              }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-transparent focus:outline-none transition-all duration-200 pr-12"
                  style={{
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all p-1.5 hover:bg-white/50 rounded-lg"
                  style={{
                    color: 'var(--text-secondary)',
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{
                      background: 'linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%)'
                    }}>
                      <div
                        className="h-full transition-all duration-300 rounded-full"
                        style={{
                          width: `${(passwordStrength.score / 6) * 100}%`,
                          background: `linear-gradient(90deg, ${
                            passwordStrength.score <= 2 ? '#ef4444' :
                            passwordStrength.score <= 3 ? '#f59e0b' :
                            passwordStrength.score <= 4 ? '#eab308' :
                            '#22c55e'
                          }, ${
                            passwordStrength.score <= 2 ? '#dc2626' :
                            passwordStrength.score <= 3 ? '#d97706' :
                            passwordStrength.score <= 4 ? '#ca8a04' :
                            '#16a34a'
                          })`
                        }}
                      ></div>
                    </div>
                    <span className={`text-xs font-semibold ${passwordStrength.text}`}>
                      {passwordStrength.level}
                    </span>
                  </div>

                  {passwordStrength.feedback.length > 0 && (
                    <div className="space-y-1">
                      {passwordStrength.feedback.slice(0, 2).map((tip, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <X size={12} style={{ color: 'var(--brand-red)' }} />
                          {tip}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {errors.password && (
                <p className="mt-2 text-xs font-medium" style={{ color: 'var(--brand-red)' }}>{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                Confirm Password
              </label>
              <div style={{
                background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 -2px 4px rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                position: 'relative'
              }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-transparent focus:outline-none transition-all duration-200 pr-12"
                  style={{
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all p-1.5 hover:bg-white/50 rounded-lg"
                  style={{
                    color: 'var(--text-secondary)',
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-xs font-medium" style={{ color: 'var(--brand-red)' }}>{errors.confirmPassword}</p>
              )}
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-semibold py-3 rounded-xl text-white transition-all duration-200 transform relative cursor-pointer mt-8"
              style={{
                background: isLoading
                  ? 'linear-gradient(135deg, var(--text-tertiary) 0%, var(--text-secondary) 100%)'
                  : 'linear-gradient(135deg, var(--brand-green), var(--brand-green-dark))',
                boxShadow: isLoading
                  ? 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  : '0 8px 20px rgba(52, 199, 89, 0.3), 0 4px 8px rgba(36, 138, 61, 0.2)',
                transform: isLoading ? 'scale(0.98)' : 'scale(1)'
              }}
              onMouseDown={(e) => !isLoading && (e.currentTarget.style.boxShadow = 'inset 0 4px 12px rgba(0, 0, 0, 0.15)')}
              onMouseUp={(e) => !isLoading && (e.currentTarget.style.boxShadow = '0 8px 20px rgba(52, 199, 89, 0.3), 0 4px 8px rgba(36, 138, 61, 0.2)')}
              onMouseLeave={(e) => !isLoading && (e.currentTarget.style.boxShadow = '0 8px 20px rgba(52, 199, 89, 0.3), 0 4px 8px rgba(36, 138, 61, 0.2)')}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--shadow-dark), transparent)'
              }}></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 font-medium" style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
                color: 'var(--text-secondary)'
              }}>Already a member?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <button
            onClick={() => navigate('/login')}
            className="w-full font-semibold py-3 rounded-xl transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 -1px 2px rgba(255, 255, 255, 0.6)',
              color: 'var(--text-primary)'
            }}
            onMouseDown={(e) => (e.currentTarget.style.boxShadow = 'inset 0 2px 6px rgba(0, 0, 0, 0.1)')}
            onMouseUp={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 -1px 2px rgba(255, 255, 255, 0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 -1px 2px rgba(255, 255, 255, 0.6)')}
          >
            Sign In
          </button>
        </div>

        {/* Terms */}
        <p className="mt-8 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
          By creating an account, you agree to our{' '}
          <a href="#" className="font-semibold" style={{ color: 'var(--brand-green)' }}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-semibold" style={{ color: 'var(--brand-green)' }}>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
