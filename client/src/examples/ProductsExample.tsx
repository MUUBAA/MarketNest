import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores';
import { fetchAllProducts } from '../../redux/thunk/product';
import ProductCard from '../components/ProductCard';

/**
 * Example component showing how to use the products Redux thunks
 * 
 * Usage Examples:
 * 
 * 1. Fetch all products:
 *    dispatch(fetchProducts());
 * 
 * 2. Fetch products by category:
 *    dispatch(fetchProductsByCategory('Electronics'));
 * 
 * 3. Fetch single product:
 *    dispatch(fetchProductById(123));
 */

const ProductsExample: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // Fetch all products on component mount
    dispatch(fetchAllProducts());
    
    // OR fetch products by category
    // dispatch(fetchProductsByCategory('Electronics'));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Products from Database</h1>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.itemName}
            price={`₹${product.itemPrice}`}
            imageUrl={product.cloudinaryUrl || product.itemUrl || ''}
            weight={product.stockQuantity > 0 ? `In Stock: ${product.stockQuantity}` : 'Out of Stock'}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found. Please add products to the database.
        </div>
      )}
    </div>
  );
};

export default ProductsExample;
