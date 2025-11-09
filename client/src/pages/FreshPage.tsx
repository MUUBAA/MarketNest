import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores/index.js';
import { fetchAllProducts, type ProductGetAllResponse } from '../../redux/thunk/productThunk.js';
import ProductGrid from '../components/ProductGrid';

const FreshPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts({} as ProductGetAllResponse));
  }, [dispatch]);

  // Transform API products to match ProductGrid props
  const transformedProducts = products.map((product: ProductGetAllResponse) => ({
    itemName: product.itemName,
    itemPrice: `₹${product.itemPrice}`,
    itemUrl: product.itemUrl,
    weight: product.itemDescription,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Fresh Produce</h1>
          <p className="mt-2 text-gray-600">Fresh fruits, vegetables, and organic products</p>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!loading && !error && transformedProducts.length > 0 && (
          <ProductGrid title="Fruits & Vegetables" products={transformedProducts} />
        )}

        {!loading && !error && transformedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default FreshPage;
