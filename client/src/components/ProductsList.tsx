import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores/index.js';
import { fetchAllProducts } from '../../redux/thunk/product.js';
import ProductCard from './ProductCard';

interface ProductsListProps {
  categoryId?: number;
}

const ProductsList: React.FC<ProductsListProps> = ({ categoryId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts({ categoryId }));
  }, [dispatch, categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          itemName={product.itemName}
          itemPrice={`₹${product.itemPrice}`}
          itemUrl={product.itemUrl}
          weight={product.itemDescription}
        />
      ))}
    </div>
  );
};

export default ProductsList;
