import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now, just log the action. In a real app, this would open a login modal or navigate to login page
    console.log('Login clicked');
    // You can add actual login logic here or navigate to a login page
    // navigate('/login');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Cart</h1>
        </div>
      </div>

      {/* Empty cart content */}
      <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Please Login</h2>
          <p className="mb-8 text-gray-600">Please login to access the cart.</p>
          
          <button
            onClick={handleLogin}
            className="w-full max-w-sm rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;