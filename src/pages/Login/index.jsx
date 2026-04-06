import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { setAuthToken, setRememberedEmail, getRememberedEmail } from '../../utils/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: getRememberedEmail(),
    password: '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

      if (rememberMe) {
        setRememberedEmail(formData.email);
      }

      toast.success('Sign in successful!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error('Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%)',
    }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {/* <div className="inline-block mb-4 p-4 rounded-full" style={{
            background: 'linear-gradient(135deg, var(--brand-blue-light), var(--brand-blue))',
            boxShadow: `
              0 10px 30px rgba(90, 200, 250, 0.4),
              inset -2px -2px 8px rgba(255, 255, 255, 0.8),
              inset 2px 2px 8px rgba(0, 0, 0, 0.1)
            `
          }}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16z"></path>
            </svg>
          </div> */}
          <h1 className="text-4xl font-bold" style={{
            color: 'var(--text-primary)',
            background: 'linear-gradient(to right, var(--brand-blue), var(--brand-blue-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px'
          }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Sign in to your FinVault account</p>
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all p-1.5 hover:bg-white/50 rounded-lg active:text-var(--text-primary)"
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
              {errors.password && (
                <p className="mt-2 text-xs font-medium" style={{ color: 'var(--brand-red)' }}>{errors.password}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-3 py-2">
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: rememberMe 
                  ? 'linear-gradient(135deg, var(--brand-blue), var(--brand-blue-dark))'
                  : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                boxShadow: rememberMe
                  ? '0 4px 12px rgba(0, 122, 255, 0.3), inset 0 -2px 4px rgba(255, 255, 255, 0.3)'
                  : 'inset 0 2px 6px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }} onClick={() => setRememberMe(!rememberMe)}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="hidden"
                />
                {rememberMe && (
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <label htmlFor="rememberMe" className="text-sm cursor-pointer select-none" style={{ color: 'var(--text-secondary)' }}>
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-semibold py-3 rounded-xl text-white transition-all duration-200 transform relative cursor-pointer"
              style={{
                background: isLoading
                  ? 'linear-gradient(135deg, var(--text-tertiary) 0%, var(--text-secondary) 100%)'
                  : 'linear-gradient(135deg, var(--brand-blue), var(--brand-blue-dark))',
                boxShadow: isLoading
                  ? 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  : '0 8px 20px rgba(0, 122, 255, 0.3), 0 4px 8px rgba(0, 81, 213, 0.2)',
                transform: isLoading ? 'scale(0.98)' : 'scale(1)'
              }}
              onMouseDown={(e) => !isLoading && (e.currentTarget.style.boxShadow = 'inset 0 4px 12px rgba(0, 0, 0, 0.15)')}
              onMouseUp={(e) => !isLoading && (e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 122, 255, 0.3), 0 4px 8px rgba(0, 81, 213, 0.2)')}
              onMouseLeave={(e) => !isLoading && (e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 122, 255, 0.3), 0 4px 8px rgba(0, 81, 213, 0.2)')}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
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
              }}>New to FinVault?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <button
            onClick={() => navigate('/signup')}
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
            Create Account
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-5 rounded-2xl" style={{
          background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 81, 213, 0.1) 100%)',
          boxShadow: 'inset 0 2px 6px rgba(0, 122, 255, 0.1), 0 2px 8px rgba(0, 122, 255, 0.15)',
          border: '1px solid rgba(0, 122, 255, 0.2)'
        }}>
          <p className="text-xs font-bold mb-2" style={{ color: 'var(--brand-blue-dark)' }}>✨ Demo Credentials:</p>
          <p className="text-xs" style={{ color: 'var(--brand-blue)' }}>📧 demo@example.com</p>
          <p className="text-xs" style={{ color: 'var(--brand-blue)' }}>🔒 password123</p>
        </div>
      </div>
    </div>
  );
}
