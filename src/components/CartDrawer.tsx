import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = 'empty' | 'login' | 'register';

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState<ViewState>('empty');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleCreateAccount = () => {
    setCurrentView('register');
  };

  const handleBackToEmpty = () => {
    setCurrentView('empty');
    setFormData({ email: '', username: '', password: '', confirmPassword: '' });
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email: formData.email, password: formData.password });
  };

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', formData);
  };

  const renderEmptyCart = () => (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <div className="mb-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center">
          <svg 
            className="h-10 w-10 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
      
      <h3 className="mb-2 text-xl font-semibold text-gray-900">Please Login</h3>
      <p className="mb-8 text-gray-600 text-sm">Please login to access the cart.</p>
      
      <button 
        onClick={handleLogin}
        className="w-full rounded-xl bg-pink-500 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg transform hover:scale-[1.02]"
      >
        Login
      </button>
    </div>
  );

  const renderLoginForm = () => (
    <div className="py-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome Back</h3>
        <p className="text-gray-600 text-sm">Login to access your cart</p>
      </div>

      <form onSubmit={handleSubmitLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email / Username"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            className="text-pink-500 text-sm hover:text-pink-600 transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-pink-500 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg transform hover:scale-[1.02]"
        >
          Continue
        </button>

        <div className="text-center pt-4">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-pink-500 text-sm font-medium hover:text-pink-600 transition-colors"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="py-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Account</h3>
        <p className="text-gray-600 text-sm">Join us to start shopping</p>
      </div>

      <form onSubmit={handleSubmitRegister} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-pink-500 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg transform hover:scale-[1.02]"
        >
          Create Account
        </button>

        <div className="text-center pt-4">
          <span className="text-gray-600 text-sm">Already have an account? </span>
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-pink-500 text-sm font-medium hover:text-pink-600 transition-colors"
          >
            Login
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          By continuing, you agree to our{' '}
          <span className="text-pink-500">Terms of Service</span> &{' '}
          <span className="text-pink-500">Privacy Policy</span>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {/* Backdrop Overlay with Blur Effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Cart Modal - Centered Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden">
          {/* Header */}
          <div className="relative flex items-center justify-between p-6 border-b border-gray-100">
            <button 
              onClick={currentView !== 'empty' ? handleBackToEmpty : onClose}
              className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 w-full text-center">Cart</h2>
          </div>

          {/* Cart Content */}
          <div className="px-6 pb-6">
            {currentView === 'empty' && renderEmptyCart()}
            {currentView === 'login' && renderLoginForm()}
            {currentView === 'register' && renderRegisterForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;